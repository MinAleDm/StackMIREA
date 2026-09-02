import assert from "node:assert/strict";
import test from "node:test";

import { parseDocFrontmatter } from "../../content-schema.mjs";
import { ManifestBuilder } from "../../content-manifest.mjs";

test("optional educational metadata is parsed and normalized", () => {
  const result = parseDocFrontmatter({
    title: "MVC",
    description: "Practice",
    author: "minkinad",
    order: 2,
    type: "practice",
    tags: ["Java", "MVC"],
    difficulty: "intermediate",
    updatedAt: new Date("2026-09-02T00:00:00.000Z"),
    estimatedMinutes: "15",
    status: "published"
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.updatedAt, "2026-09-02");
    assert.equal(result.data.estimatedMinutes, 15);
    assert.deepEqual(result.data.tags, ["Java", "MVC"]);
  }
});

test("unknown material metadata values are rejected", () => {
  const result = parseDocFrontmatter({ type: "video", difficulty: "expert", status: "hidden" });
  assert.equal(result.success, false);
});

test("draft pages are excluded from the production manifest", () => {
  const repository = {
    read() {
      return [
        {
          kind: "source",
          rawSource: "---\ntitle: Draft\ndescription: Hidden page\nauthor: minkinad\norder: 2\nstatus: draft\n---\n\nDraft body.",
          sourcePath: "docs/python/draft.mdx",
          editPath: "python/draft.mdx",
          virtualPath: "python/draft.mdx"
        },
        {
          kind: "source",
          rawSource: "---\ntitle: Published\ndescription: Visible page\nauthor: minkinad\norder: 3\n---\n\nPublished body.",
          sourcePath: "docs/python/published.mdx",
          editPath: "python/published.mdx",
          virtualPath: "python/published.mdx"
        }
      ];
    }
  };
  const manifest = new ManifestBuilder(repository, "error").build();

  assert.equal(manifest.docs.some((doc) => doc.slugKey === "python/draft"), false);
  assert.equal(manifest.docs.some((doc) => doc.slugKey === "python/published"), true);
});
