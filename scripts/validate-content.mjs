import fs from "node:fs";
import path from "node:path";

import { manifestPath, readContentManifest } from "./content-manifest.mjs";

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, "public");

const allowedSchemes = ["http://", "https://", "mailto:", "tel:", "data:"];
const knownRepoRoots = ["resources/", "public/", "docs/"];
const knownAppRoutes = new Set(["/", "/ask", "/docs", "/robots.txt", "/sitemap.xml"]);

function stripOptionalTitle(rawTarget) {
  const trimmed = rawTarget.trim().replace(/^<|>$/g, "");
  const titleMatch = /^([^ ]+)(?:\s+["'(].*)?$/.exec(trimmed);
  return titleMatch?.[1] ?? trimmed;
}

function splitTarget(rawTarget) {
  const cleanedTarget = stripOptionalTitle(rawTarget);
  const [pathnameWithQuery = "", rawHash = ""] = cleanedTarget.split("#", 2);
  const pathname = pathnameWithQuery.split("?", 1)[0];

  return {
    pathname,
    hash: decodeHash(rawHash)
  };
}

function decodeHash(hash) {
  try {
    return decodeURIComponent(hash);
  } catch {
    return hash;
  }
}

function normalizeVirtualPath(value) {
  return path.posix.normalize(value.replace(/\\/g, "/")).replace(/^\.\//, "");
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
  const slugPath = pathname.replace(/^\/docs\/?/, "").replace(/^\/|\/$/g, "");

  if (!slugPath) {
    return { kind: "route", resolvedPath: "/docs" };
  }

  const doc = lookup.bySlug.get(slugPath);

  if (doc) {
    return { kind: "markdown", doc };
  }

  return null;
}

function resolveInternalPath(doc, pathname, lookup) {
  if (!pathname) {
    return null;
  }

  if (pathname.startsWith("/")) {
    if (knownAppRoutes.has(pathname)) {
      return { kind: "route", resolvedPath: pathname };
    }

    if (pathname.startsWith("/docs")) {
      return resolveDocsRoute(pathname, lookup);
    }

    const publicPath = path.join(publicRoot, pathname.slice(1));
    if (fs.existsSync(publicPath)) {
      return { kind: "asset", resolvedPath: publicPath };
    }

    return null;
  }

  const virtualBasePath = path.posix.join(path.posix.dirname(doc.virtualPath), pathname);
  const targetDoc = resolveMarkdownDoc(virtualBasePath, lookup);

  if (targetDoc) {
    return { kind: "markdown", doc: targetDoc };
  }

  if (doc.sourcePath) {
    const sourceDirectory = path.dirname(path.join(projectRoot, doc.sourcePath));
    const resolvedPath = path.resolve(sourceDirectory, pathname);

    if (fs.existsSync(resolvedPath)) {
      return { kind: "asset", resolvedPath };
    }
  }

  return null;
}

function hasAnchor(doc, hash) {
  return new Set(doc.anchors).has(hash);
}

function collectLinkErrors(doc, lookup) {
  const errors = [];
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

      if (!pathname && hash) {
        if (!hasAnchor(doc, hash)) {
          errors.push({
            doc,
            line: lineIndex + 1,
            message: `anchor "#${hash}" was not found in the current document`
          });
        }

        match = linkPattern.exec(line);
        continue;
      }

      if (allowedSchemes.some((scheme) => pathname.startsWith(scheme))) {
        match = linkPattern.exec(line);
        continue;
      }

      const resolved = resolveInternalPath(doc, pathname, lookup);

      if (!resolved) {
        errors.push({
          doc,
          line: lineIndex + 1,
          message: `target "${pathname}" does not exist`
        });
        match = linkPattern.exec(line);
        continue;
      }

      if (hash && resolved.kind === "markdown" && !hasAnchor(resolved.doc, hash)) {
        errors.push({
          doc,
          line: lineIndex + 1,
          message: `anchor "#${hash}" was not found in "${resolved.doc.sourcePath ?? resolved.doc.virtualPath}"`
        });
      }

      match = linkPattern.exec(line);
    }
  }

  return errors;
}

function collectFenceReferenceErrors(doc) {
  const errors = [];
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

    if (!reference || !knownRepoRoots.some((prefix) => reference.startsWith(prefix))) {
      continue;
    }

    const resolvedPath = path.join(projectRoot, reference);
    if (fs.existsSync(resolvedPath)) {
      continue;
    }

    errors.push({
      doc,
      line: lineIndex + 1,
      message: `referenced file "${reference}" does not exist`
    });
  }

  return errors;
}

function formatError(error) {
  const label = error.doc.sourcePath ?? `generated:${error.doc.virtualPath}`;
  return `${label}:${error.line} ${error.message}`;
}

if (!fs.existsSync(manifestPath)) {
  console.error('Content manifest ".cache/content-manifest.json" was not found. Run "npm run prepare:content" first.');
  process.exit(1);
}

const manifest = readContentManifest();
const lookup = createManifestLookup(manifest.docs);
const errors = [];

for (const doc of manifest.docs) {
  errors.push(...collectLinkErrors(doc, lookup));
  errors.push(...collectFenceReferenceErrors(doc));
}

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} issue(s):`);

  for (const error of errors) {
    console.error(`- ${formatError(error)}`);
  }

  process.exit(1);
}

console.log(`Content validation passed for ${manifest.docs.length} manifest document(s).`);
