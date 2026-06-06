import fs from "node:fs";
import path from "node:path";

const allowedSchemes = ["http://", "https://", "mailto:", "tel:", "data:"];
const knownRepoRoots = ["resources/", "public/", "docs/"];
const knownAppRoutes = new Set([
  "/",
  "/ask",
  "/docs",
  "/robots.txt",
  "/sitemap.xml"
]);

function getDocumentLabel(doc) {
  return doc.sourcePath ?? `generated:${doc.virtualPath}`;
}

function stripOptionalTitle(rawTarget) {
  const trimmed = rawTarget.trim().replace(/^<|>$/g, "");
  const titleMatch = /^([^ ]+)(?:\s+["'(].*)?$/.exec(trimmed);

  return titleMatch?.[1] ?? trimmed;
}

function decodeHash(hash) {
  try {
    return decodeURIComponent(hash);
  } catch {
    return hash;
  }
}

function splitTarget(rawTarget) {
  const cleanedTarget = stripOptionalTitle(rawTarget);
  const [pathnameWithQuery = "", rawHash = ""] = cleanedTarget.split("#", 2);

  return {
    pathname: pathnameWithQuery.split("?", 1)[0],
    hash: decodeHash(rawHash)
  };
}

function normalizeVirtualPath(value) {
  return path.posix
    .normalize(value.replace(/\\/g, "/"))
    .replace(/^\.\//, "");
}

function createManifestLookup(docs) {
  const bySlug = new Map();
  const byVirtualPath = new Map();

  for (const doc of docs) {
    bySlug.set(doc.slugKey, doc);
    byVirtualPath.set(doc.virtualPath, doc);
  }

  return {
    bySlug,
    byVirtualPath
  };
}

function resolveMarkdownDoc(basePathname, lookup) {
  if (!basePathname) {
    return null;
  }

  const normalizedPath = normalizeVirtualPath(basePathname);
  const hasExtension = /\.[A-Za-z0-9]+$/.test(normalizedPath);

  const candidates = hasExtension
    ? [normalizedPath, normalizedPath.replace(/\.md$/i, ".mdx")]
    : [
        `${normalizedPath}.mdx`,
        `${normalizedPath}.md`,
        path.posix.join(normalizedPath, "index.mdx"),
        path.posix.join(normalizedPath, "index.md")
      ];

  for (const candidate of candidates) {
    const doc = lookup.byVirtualPath.get(candidate);

    if (doc) {
      return doc;
    }
  }

  return null;
}

function resolveDocsRoute(pathname, lookup) {
  const slugPath = pathname
    .replace(/^\/docs\/?/, "")
    .replace(/^\/|\/$/g, "");

  if (!slugPath) {
    return {
      kind: "route",
      resolvedPath: "/docs"
    };
  }

  const doc = lookup.bySlug.get(slugPath);

  return doc
    ? {
        kind: "markdown",
        doc
      }
    : null;
}

function resolveInternalPath(doc, pathname, lookup, projectRoot) {
  if (!pathname) {
    return null;
  }

  if (pathname.startsWith("/")) {
    if (knownAppRoutes.has(pathname)) {
      return {
        kind: "route",
        resolvedPath: pathname
      };
    }

    if (pathname.startsWith("/docs")) {
      return resolveDocsRoute(pathname, lookup);
    }

    const publicPath = path.join(
      projectRoot,
      "public",
      pathname.slice(1)
    );

    return fs.existsSync(publicPath)
      ? {
          kind: "asset",
          resolvedPath: publicPath
        }
      : null;
  }

  const virtualBasePath = path.posix.join(
    path.posix.dirname(doc.virtualPath),
    pathname
  );

  const targetDoc = resolveMarkdownDoc(virtualBasePath, lookup);

  if (targetDoc) {
    return {
      kind: "markdown",
      doc: targetDoc
    };
  }

  if (!doc.sourcePath) {
    return null;
  }

  const sourceDirectory = path.dirname(
    path.join(projectRoot, doc.sourcePath)
  );

  const resolvedPath = path.resolve(sourceDirectory, pathname);

  return fs.existsSync(resolvedPath)
    ? {
        kind: "asset",
        resolvedPath
      }
    : null;
}

function hasAnchor(doc, hash) {
  return doc.anchors.includes(hash);
}

function collectLinkIssues(doc, lookup, projectRoot) {
  const issues = [];
  const lines = doc.body.split("\n");
  let inCodeFence = false;

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    const trimmed = line.trim();

    if (/^(`{3,}|~{3,})/.test(trimmed)) {
      inCodeFence = !inCodeFence;
    }

    if (inCodeFence) {
      continue;
    }

    const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;
    let match = linkPattern.exec(line);

    while (match) {
      const rawTarget = match[1];
      const { pathname, hash } = splitTarget(rawTarget);
      const file = getDocumentLabel(doc);
      const lineNumber = lineIndex + 1;

      if (!pathname && hash) {
        if (!hasAnchor(doc, hash)) {
          issues.push({
            ruleId: "broken-anchor",
            severity: "error",
            file,
            line: lineNumber,
            message: `Anchor "#${hash}" was not found in the current document`,
            details: {
              anchor: hash,
              sourceSlug: doc.slugKey
            }
          });
        }

        match = linkPattern.exec(line);
        continue;
      }

      if (allowedSchemes.some((scheme) => pathname.startsWith(scheme))) {
        match = linkPattern.exec(line);
        continue;
      }

      const resolved = resolveInternalPath(
        doc,
        pathname,
        lookup,
        projectRoot
      );

      if (!resolved) {
        issues.push({
          ruleId: "broken-link",
          severity: "error",
          file,
          line: lineNumber,
          message: `Target "${pathname}" does not exist`,
          details: {
            target: pathname,
            sourceSlug: doc.slugKey
          }
        });

        match = linkPattern.exec(line);
        continue;
      }

      if (
        hash &&
        resolved.kind === "markdown" &&
        !hasAnchor(resolved.doc, hash)
      ) {
        issues.push({
          ruleId: "broken-anchor",
          severity: "error",
          file,
          line: lineNumber,
          message: `Anchor "#${hash}" was not found in "${getDocumentLabel(resolved.doc)}"`,
          details: {
            anchor: hash,
            target: pathname,
            sourceSlug: doc.slugKey
          }
        });
      }

      match = linkPattern.exec(line);
    }
  }

  return issues;
}

function collectFenceReferenceIssues(doc, projectRoot) {
  const issues = [];
  const lines = doc.body.split("\n");

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const trimmed = lines[lineIndex].trim();
    const fenceMatch = /^(`{3,}|~{3,})(.*)$/.exec(trimmed);

    if (!fenceMatch) {
      continue;
    }

    const info = fenceMatch[2] ?? "";
    const filenameMatch = /(?:title|filename)=["']([^"']+)["']/.exec(info);
    const reference = filenameMatch?.[1]?.trim();

    if (
      !reference ||
      !knownRepoRoots.some((prefix) => reference.startsWith(prefix))
    ) {
      continue;
    }

    const resolvedPath = path.join(projectRoot, reference);

    if (fs.existsSync(resolvedPath)) {
      continue;
    }

    issues.push({
      ruleId: "missing-file-reference",
      severity: "error",
      file: getDocumentLabel(doc),
      line: lineIndex + 1,
      message: `Referenced file "${reference}" does not exist`,
      details: {
        reference,
        sourceSlug: doc.slugKey
      }
    });
  }

  return issues;
}

export const contentLinksRule = {
  id: "content-links",

  evaluate(context) {
    const { manifest, projectRoot } = context;
    const lookup = createManifestLookup(manifest.docs);
    const issues = [];

    for (const doc of manifest.docs) {
      issues.push(
        ...collectLinkIssues(doc, lookup, projectRoot),
        ...collectFenceReferenceIssues(doc, projectRoot)
      );
    }

    return issues;
  }
};