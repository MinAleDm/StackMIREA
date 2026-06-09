import path from "node:path";

import { stripMarkdown } from "../../content-manifest.mjs";

function documentFile(doc) {
  return doc.sourcePath ?? `generated:${doc.virtualPath}`;
}

function normalizeReference(value) {
  return value
    .trim()
    .replace(/^<|>$/g, "")
    .split("#", 1)[0]
    .split("?", 1)[0]
    .replace(/\\/g, "/")
    .replace(/^\.\//, "")
    .replace(/\/$/, "");
}

function collectResourceReferences(docs) {
  const references = new Set();

  for (const doc of docs) {
    const markdownPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;
    let markdownMatch = markdownPattern.exec(doc.body);

    while (markdownMatch) {
      const reference = normalizeReference(markdownMatch[1]);

      if (reference.startsWith("resources/")) {
        references.add(reference);
      }

      markdownMatch = markdownPattern.exec(doc.body);
    }

    const fencePattern = /(?:title|filename)=["']([^"']+)["']/g;
    let fenceMatch = fencePattern.exec(doc.body);

    while (fenceMatch) {
      const reference = normalizeReference(fenceMatch[1]);

      if (reference.startsWith("resources/")) {
        references.add(reference);
      }

      fenceMatch = fencePattern.exec(doc.body);
    }

    const inlinePattern = /`(resources\/[^`]+)`/g;
    let inlineMatch = inlinePattern.exec(doc.body);

    while (inlineMatch) {
      references.add(normalizeReference(inlineMatch[1]));
      inlineMatch = inlinePattern.exec(doc.body);
    }
  }

  return references;
}

function resolveLinkedSlug(doc, target, docsByVirtualPath, docsBySlug) {
  const normalizedTarget = normalizeReference(target);

  if (!normalizedTarget || /^(?:https?:|mailto:|tel:|data:)/.test(normalizedTarget)) {
    return null;
  }

  if (normalizedTarget.startsWith("/docs/")) {
    return docsBySlug.has(normalizedTarget.slice("/docs/".length))
      ? normalizedTarget.slice("/docs/".length)
      : null;
  }

  if (normalizedTarget.startsWith("/")) {
    return null;
  }

  const basePath = path.posix.normalize(
    path.posix.join(path.posix.dirname(doc.virtualPath), normalizedTarget)
  );
  const candidates = /\.[A-Za-z0-9]+$/.test(basePath)
    ? [basePath, basePath.replace(/\.md$/i, ".mdx")]
    : [
        `${basePath}.mdx`,
        `${basePath}.md`,
        path.posix.join(basePath, "index.mdx"),
        path.posix.join(basePath, "index.md")
      ];

  for (const candidate of candidates) {
    const targetDoc = docsByVirtualPath.get(candidate);

    if (targetDoc) {
      return targetDoc.slugKey;
    }
  }

  return null;
}

export const missingDescriptionRule = {
  id: "missing-description",
  evaluate({ manifest }) {
    return manifest.docs
      .filter((doc) => !doc.description?.trim())
      .map((doc) => ({
        ruleId: "missing-description",
        severity: "error",
        file: documentFile(doc),
        message: "Document does not have a description"
      }));
  }
};

export const duplicateSlugRule = {
  id: "duplicate-slug",
  evaluate({ manifest }) {
    const firstDocumentBySlug = new Map();
    const issues = [];

    for (const doc of manifest.docs) {
      const existing = firstDocumentBySlug.get(doc.slugKey);

      if (existing) {
        issues.push({
          ruleId: "duplicate-slug",
          severity: "error",
          file: documentFile(doc),
          message: `Slug "${doc.slugKey}" is already used by "${documentFile(existing)}"`,
          details: {
            slug: doc.slugKey,
            existingFile: documentFile(existing)
          }
        });
      } else {
        firstDocumentBySlug.set(doc.slugKey, doc);
      }
    }

    return issues;
  }
};

export const invalidAuthorRule = {
  id: "invalid-author",
  evaluate({ manifest }) {
    const loginPattern = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;

    return manifest.docs.flatMap((doc) => {
      const github = doc.author?.github ?? "";
      const valid =
        loginPattern.test(github) &&
        doc.author?.profileUrl === `https://github.com/${github}` &&
        doc.author?.avatarUrl?.startsWith(`https://github.com/${github}.png`);

      return valid
        ? []
        : [
            {
              ruleId: "invalid-author",
              severity: "error",
              file: documentFile(doc),
              message: `Document author "${github || "<empty>"}" is invalid`,
              value: github
            }
          ];
    });
  }
};

export const oversizedPageRule = {
  id: "oversized-page",
  evaluate({ config, manifest }) {
    return manifest.docs.flatMap((doc) => {
      const sizeBytes = Buffer.byteLength(doc.body, "utf8");

      if (sizeBytes > config.pageSize.errorBytes) {
        return [
          {
            ruleId: "oversized-page",
            severity: "error",
            file: documentFile(doc),
            message: "Document exceeds the maximum page size",
            value: sizeBytes,
            threshold: config.pageSize.errorBytes
          }
        ];
      }

      if (sizeBytes > config.pageSize.warningBytes) {
        return [
          {
            ruleId: "oversized-page",
            severity: "warning",
            file: documentFile(doc),
            message: "Document exceeds the recommended page size",
            value: sizeBytes,
            threshold: config.pageSize.warningBytes
          }
        ];
      }

      return [];
    });
  }
};

export const emptySectionIndexRule = {
  id: "empty-section-index",
  evaluate({ config, manifest }) {
    return manifest.docs.flatMap((doc) => {
      if (!doc.isSectionIndex) {
        return [];
      }

      const textLength = stripMarkdown(doc.body).length;

      return textLength < config.sectionIndex.minTextCharacters
        ? [
            {
              ruleId: "empty-section-index",
              severity: "error",
              file: documentFile(doc),
              message: "Section index does not contain enough meaningful text",
              value: textLength,
              threshold: config.sectionIndex.minTextCharacters
            }
          ]
        : [];
    });
  }
};

export const oversizedSearchChunkRule = {
  id: "oversized-search-chunk",
  evaluate({ config, searchIndex }) {
    return searchIndex.docs.flatMap((doc) =>
      doc.chunks.flatMap((chunk) =>
        chunk.text.length > config.searchChunk.maxCharacters
          ? [
              {
                ruleId: "oversized-search-chunk",
                severity: "error",
                file: `search:${doc.id}#${chunk.id}`,
                message: "Search chunk exceeds the maximum character count",
                value: chunk.text.length,
                threshold: config.searchChunk.maxCharacters,
                details: {
                  documentId: doc.id,
                  chunkId: chunk.id
                }
              }
            ]
          : []
      )
    );
  }
};

export const unusedResourceRule = {
  id: "unused-resource",
  evaluate({ config, manifest, resources }) {
    const references = collectResourceReferences(manifest.docs);
    const ignoredPaths = new Set(config.resources?.ignoredPaths ?? []);

    return resources
      .filter((resource) => !ignoredPaths.has(resource))
      .filter(
        (resource) =>
          ![...references].some(
            (reference) => resource === reference || resource.startsWith(`${reference}/`)
          )
      )
      .map((resource) => ({
        ruleId: "unused-resource",
        severity: "warning",
        file: resource,
        message: "Resource is not referenced by any content document"
      }));
  }
};

export const orphanPageRule = {
  id: "orphan-page",
  evaluate({ config, manifest }) {
    const docsByVirtualPath = new Map(manifest.docs.map((doc) => [doc.virtualPath, doc]));
    const docsBySlug = new Map(manifest.docs.map((doc) => [doc.slugKey, doc]));
    const linkedSlugs = new Set();

    for (const doc of manifest.docs) {
      const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;
      let match = linkPattern.exec(doc.body);

      while (match) {
        const targetSlug = resolveLinkedSlug(
          doc,
          match[1],
          docsByVirtualPath,
          docsBySlug
        );

        if (targetSlug && targetSlug !== doc.slugKey) {
          linkedSlugs.add(targetSlug);
        }

        match = linkPattern.exec(doc.body);
      }
    }

    const ignoredSlugs = new Set(config.orphanPages.ignoredSlugs);

    return manifest.docs
      .filter(
        (doc) =>
          !doc.isSectionIndex &&
          !doc.isGenerated &&
          !ignoredSlugs.has(doc.slugKey) &&
          !linkedSlugs.has(doc.slugKey)
      )
      .map((doc) => ({
        ruleId: "orphan-page",
        severity: "warning",
        file: documentFile(doc),
        message: "Document has no incoming links from other content pages",
        details: {
          slug: doc.slugKey
        }
      }));
  }
};
