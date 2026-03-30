import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, "content");
const publicRoot = path.join(projectRoot, "public");

const allowedSchemes = ["http://", "https://", "mailto:", "tel:", "data:"];
const knownRepoRoots = ["resources/", "public/", "docs/", "content/"];
const knownAppRoutes = new Set(["/", "/ask", "/authors", "/docs", "/robots.txt", "/sitemap.xml"]);

function walkFiles(rootDirectory, predicate) {
  const files = [];
  const stack = [rootDirectory];

  while (stack.length > 0) {
    const currentDirectory = stack.pop();

    if (!currentDirectory || !fs.existsSync(currentDirectory)) {
      continue;
    }

    for (const entry of fs.readdirSync(currentDirectory, { withFileTypes: true })) {
      const fullPath = path.join(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (entry.isFile() && predicate(fullPath)) {
        files.push(fullPath);
      }
    }
  }

  return files.sort((left, right) => left.localeCompare(right));
}

function isMarkdownFile(filePath) {
  return /\.(md|mdx)$/i.test(filePath);
}

function normalizeHeading(rawHeading) {
  return rawHeading
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/#+$/g, "")
    .trim();
}

function extractHeadingAnchors(markdown) {
  const slugger = new GithubSlugger();
  const anchors = new Set();
  const lines = markdown.split("\n");
  let inCodeFence = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^(`{3,}|~{3,})/.test(trimmed)) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (!headingMatch) {
      continue;
    }

    const title = normalizeHeading(headingMatch[2]);
    if (!title) {
      continue;
    }

    anchors.add(slugger.slug(title));
  }

  return anchors;
}

function stripOptionalTitle(rawTarget) {
  const trimmed = rawTarget.trim().replace(/^<|>$/g, "");
  const titleMatch = /^([^ ]+)(?:\s+["'(].*)?$/.exec(trimmed);
  return titleMatch?.[1] ?? trimmed;
}

function splitTarget(rawTarget) {
  const cleanedTarget = stripOptionalTitle(rawTarget);
  const [pathnameWithQuery = "", hash = ""] = cleanedTarget.split("#", 2);
  const pathname = pathnameWithQuery.split("?", 1)[0];

  return {
    pathname,
    hash
  };
}

function resolveMarkdownPath(basePathname) {
  if (!basePathname) {
    return null;
  }

  const hasExtension = /\.[A-Za-z0-9]+$/.test(basePathname);
  const candidates = hasExtension
    ? [basePathname]
    : [
        `${basePathname}.md`,
        `${basePathname}.mdx`,
        path.join(basePathname, "index.md"),
        path.join(basePathname, "index.mdx")
      ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return null;
}

function resolveInternalPath(filePath, pathname) {
  if (!pathname) {
    return null;
  }

  if (pathname.startsWith("/")) {
    if (knownAppRoutes.has(pathname)) {
      return { kind: "route", resolvedPath: pathname };
    }

    if (pathname.startsWith("/docs/")) {
      const slugPath = pathname.replace(/^\/docs\//, "");
      const markdownPath = resolveMarkdownPath(path.join(contentRoot, slugPath));

      if (markdownPath) {
        return { kind: "markdown", resolvedPath: markdownPath };
      }

      return null;
    }

    const publicPath = path.join(publicRoot, pathname.slice(1));
    if (fs.existsSync(publicPath)) {
      return { kind: "asset", resolvedPath: publicPath };
    }

    return null;
  }

  const resolved = path.resolve(path.dirname(filePath), pathname);

  if (fs.existsSync(resolved)) {
    return {
      kind: isMarkdownFile(resolved) ? "markdown" : "asset",
      resolvedPath: resolved
    };
  }

  const markdownPath = resolveMarkdownPath(resolved);
  if (markdownPath) {
    return { kind: "markdown", resolvedPath: markdownPath };
  }

  return null;
}

function loadFileInfo(filePath, cache) {
  const cached = cache.get(filePath);
  if (cached) {
    return cached;
  }

  const rawSource = fs.readFileSync(filePath, "utf8");
  const parsed = matter(rawSource);
  const info = {
    rawSource,
    content: parsed.content,
    anchors: extractHeadingAnchors(parsed.content)
  };

  cache.set(filePath, info);
  return info;
}

function collectLinkErrors(filePath, rawSource, cache) {
  const errors = [];
  const lines = rawSource.split("\n");
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
        const currentFileInfo = loadFileInfo(filePath, cache);

        if (!currentFileInfo.anchors.has(hash)) {
          errors.push({
            filePath,
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

      const resolved = resolveInternalPath(filePath, pathname);

      if (!resolved) {
        errors.push({
          filePath,
          line: lineIndex + 1,
          message: `target "${pathname}" does not exist`
        });
        match = linkPattern.exec(line);
        continue;
      }

      if (hash && resolved.kind === "markdown") {
        const targetFileInfo = loadFileInfo(resolved.resolvedPath, cache);

        if (!targetFileInfo.anchors.has(hash)) {
          errors.push({
            filePath,
            line: lineIndex + 1,
            message: `anchor "#${hash}" was not found in "${path.relative(projectRoot, resolved.resolvedPath)}"`
          });
        }
      }

      match = linkPattern.exec(line);
    }
  }

  return errors;
}

function collectFenceReferenceErrors(filePath, rawSource) {
  const errors = [];
  const lines = rawSource.split("\n");

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
      filePath,
      line: lineIndex + 1,
      message: `referenced file "${reference}" does not exist`
    });
  }

  return errors;
}

function formatError(error) {
  return `${path.relative(projectRoot, error.filePath)}:${error.line} ${error.message}`;
}

if (!fs.existsSync(contentRoot)) {
  console.error('Content directory "content/" was not found. Run "npm run prepare:content" first.');
  process.exit(1);
}

const markdownFiles = walkFiles(contentRoot, isMarkdownFile);
const cache = new Map();
const errors = [];

for (const filePath of markdownFiles) {
  const { rawSource } = loadFileInfo(filePath, cache);
  errors.push(...collectLinkErrors(filePath, rawSource, cache));
  errors.push(...collectFenceReferenceErrors(filePath, rawSource));
}

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} issue(s):`);

  for (const error of errors) {
    console.error(`- ${formatError(error)}`);
  }

  process.exit(1);
}

console.log(`Content validation passed for ${markdownFiles.length} markdown file(s).`);
