import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { contentLinksRule } from "../rules/content-links.mjs";
import {
  duplicateSlugRule,
  emptySectionIndexRule,
  invalidAuthorRule,
  missingDescriptionRule,
  orphanPageRule,
  oversizedPageRule,
  oversizedSearchChunkRule,
  unusedResourceRule
} from "../rules/content-health.mjs";

function createDocument(overrides = {}) {
  return {
    slugKey: "python/example",
    sourcePath: "docs/python/example.mdx",
    virtualPath: "python/example.mdx",
    description: "Example description",
    body: "## Example\n\nA sufficiently descriptive content section.",
    anchors: ["example"],
    isSectionIndex: false,
    isGenerated: false,
    author: {
      github: "example-user",
      profileUrl: "https://github.com/example-user",
      avatarUrl: "https://github.com/example-user.png?size=120"
    },
    ...overrides
  };
}

function createContext(docs, overrides = {}) {
  return {
    projectRoot: process.cwd(),
    manifest: { docs },
    searchIndex: { docs: [] },
    resources: [],
    config: {
      pageSize: {
        warningBytes: 100,
        errorBytes: 200
      },
      searchChunk: {
        maxCharacters: 420
      },
      sectionIndex: {
        minTextCharacters: 20
      },
      orphanPages: {
        ignoredSlugs: []
      },
      resources: {
        ignoredPaths: []
      }
    },
    ...overrides
  };
}

test("frontmatter health rules report missing description and invalid author", () => {
  const doc = createDocument({
    description: "",
    author: {
      github: "invalid--",
      profileUrl: "not-a-url",
      avatarUrl: ""
    }
  });
  const context = createContext([doc]);

  assert.equal(missingDescriptionRule.evaluate(context)[0].ruleId, "missing-description");
  assert.equal(invalidAuthorRule.evaluate(context)[0].ruleId, "invalid-author");
});

test("duplicate slug rule reports the second document", () => {
  const first = createDocument();
  const second = createDocument({
    sourcePath: "docs/python/duplicate.mdx",
    virtualPath: "python/duplicate.mdx"
  });

  const issues = duplicateSlugRule.evaluate(createContext([first, second]));

  assert.equal(issues.length, 1);
  assert.equal(issues[0].file, second.sourcePath);
});

test("page and section size rules apply configured thresholds", () => {
  const oversized = createDocument({ body: "x".repeat(201) });
  const emptyIndex = createDocument({
    slugKey: "python",
    virtualPath: "python/index.mdx",
    body: "# Python",
    isSectionIndex: true
  });
  const context = createContext([oversized, emptyIndex]);

  assert.equal(oversizedPageRule.evaluate(context)[0].severity, "error");
  assert.equal(emptySectionIndexRule.evaluate(context)[0].ruleId, "empty-section-index");
});

test("oversized search chunk rule reports document and chunk", () => {
  const context = createContext([], {
    searchIndex: {
      docs: [
        {
          id: "python/example",
          chunks: [{ id: "chunk-0", text: "x".repeat(421) }]
        }
      ]
    }
  });

  const issues = oversizedSearchChunkRule.evaluate(context);

  assert.equal(issues.length, 1);
  assert.equal(issues[0].details.chunkId, "chunk-0");
});

test("unused resource rule accepts direct and directory references", () => {
  const docs = [
    createDocument({
      body: [
        '[Dataset](resources/data.csv)',
        "Use `resources/group` for grouped files."
      ].join("\n")
    })
  ];
  const context = createContext(docs, {
    resources: [
      "resources/data.csv",
      "resources/group/used.txt",
      "resources/unused.txt"
    ]
  });

  const issues = unusedResourceRule.evaluate(context);

  assert.deepEqual(issues.map((issue) => issue.file), ["resources/unused.txt"]);
});

test("orphan page rule ignores linked pages and section indexes", () => {
  const index = createDocument({
    slugKey: "python",
    virtualPath: "python/index.mdx",
    sourcePath: "docs/python/index.mdx",
    body: "[Linked](./linked)",
    isSectionIndex: true
  });
  const linked = createDocument({
    slugKey: "python/linked",
    virtualPath: "python/linked.mdx",
    sourcePath: "docs/python/linked.mdx"
  });
  const orphan = createDocument({
    slugKey: "python/orphan",
    virtualPath: "python/orphan.mdx",
    sourcePath: "docs/python/orphan.mdx"
  });

  const issues = orphanPageRule.evaluate(createContext([index, linked, orphan]));

  assert.deepEqual(issues.map((issue) => issue.file), ["docs/python/orphan.mdx"]);
});

test("content links rule reports broken links, anchors, and file references", () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "content-links-"));
  const doc = createDocument({
    body: [
      "[Missing](./missing)",
      "[Anchor](#unknown)",
      '```js title="resources/missing.js"',
      "```"
    ].join("\n")
  });

  try {
    const issues = contentLinksRule.evaluate(
      createContext([doc], {
        projectRoot
      })
    );

    assert.deepEqual(
      issues.map((issue) => issue.ruleId),
      ["broken-link", "broken-anchor", "missing-file-reference"]
    );
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
});
