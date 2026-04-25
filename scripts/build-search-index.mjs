import fs from "node:fs";
import path from "node:path";

import { findTopics, manifestPath, readContentManifest, stripMarkdown, normalizeSearchValue } from "./content-manifest.mjs";

const PUBLIC_ROOT = path.join(process.cwd(), "public");
const SEARCH_INDEX_PATH = path.join(PUBLIC_ROOT, "search-index.json");
const stopWords = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
  "что",
  "это",
  "как",
  "для",
  "или",
  "про",
  "где",
  "есть",
  "все",
  "всё",
  "по",
  "из",
  "с",
  "у",
  "на",
  "и",
  "в",
  "во",
  "не",
  "но",
  "а",
  "к",
  "ко",
  "этот",
  "эта",
  "эти"
]);

function tokenize(value) {
  return normalizeSearchValue(value)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function splitLongText(text, maxLength = 420) {
  if (text.length <= maxLength) {
    return [text];
  }

  const parts = [];
  let remaining = text;

  while (remaining.length > maxLength) {
    let sliceIndex = Math.max(
      remaining.lastIndexOf(". ", maxLength),
      remaining.lastIndexOf("! ", maxLength),
      remaining.lastIndexOf("? ", maxLength),
      remaining.lastIndexOf("; ", maxLength)
    );

    if (sliceIndex < maxLength * 0.55) {
      sliceIndex = remaining.lastIndexOf(" ", maxLength);
    }

    if (sliceIndex < maxLength * 0.4) {
      sliceIndex = maxLength;
    }

    parts.push(remaining.slice(0, sliceIndex).trim());
    remaining = remaining.slice(sliceIndex).trim();
  }

  if (remaining) {
    parts.push(remaining);
  }

  return parts.filter(Boolean);
}

function extractKeywords(values, limit = 18) {
  const counts = new Map();

  for (const value of values) {
    for (const token of tokenize(value)) {
      counts.set(token, (counts.get(token) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([token]) => token);
}

function createChunks(source, docKeywords) {
  const lines = source.split("\n");
  const chunks = [];
  let currentHeading = "";
  let buffer = [];
  let chunkIndex = 0;

  function flushBuffer() {
    if (buffer.length === 0) {
      return;
    }

    const plainText = stripMarkdown(buffer.join("\n"));
    buffer = [];

    if (plainText.length < 80) {
      return;
    }

    for (const part of splitLongText(plainText)) {
      const topics = findTopics(`${currentHeading} ${part}`);
      chunks.push({
        id: `chunk-${chunkIndex}`,
        heading: currentHeading,
        text: part,
        keywords: extractKeywords([currentHeading, part, ...docKeywords], 12),
        topics
      });
      chunkIndex += 1;
    }
  }

  for (const rawLine of lines) {
    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(rawLine.trim());

    if (headingMatch) {
      flushBuffer();
      currentHeading = stripMarkdown(headingMatch[2]);
      continue;
    }

    if (rawLine.trim() === "") {
      flushBuffer();
      continue;
    }

    buffer.push(rawLine);
  }

  flushBuffer();

  return chunks;
}

function createDoc(doc) {
  const docKeywords = [doc.title, doc.description, doc.section, doc.sectionTitle];
  const chunks = createChunks(doc.body, docKeywords);
  const chunkTopics = chunks.flatMap((chunk) => chunk.topics);
  const topics = [...new Set([...doc.topics, ...chunkTopics])];

  return {
    id: doc.slugKey || doc.section,
    href: doc.href,
    slug: doc.slug,
    section: doc.section,
    sectionTitle: doc.sectionTitle,
    title: doc.title,
    description: doc.description,
    preview: doc.preview,
    keywords: extractKeywords([doc.title, doc.description, doc.preview, ...chunks.map((chunk) => `${chunk.heading} ${chunk.text}`)], 18),
    topics,
    chunks
  };
}

function buildSearchIndex() {
  if (!fs.existsSync(manifestPath)) {
    console.error('Content manifest ".cache/content-manifest.json" was not found. Run "npm run content:manifest" first.');
    process.exit(1);
  }

  const manifest = readContentManifest();
  const docs = manifest.docs
    .map(createDoc)
    .sort((left, right) => left.title.localeCompare(right.title));

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    docs
  };
}

fs.mkdirSync(PUBLIC_ROOT, { recursive: true });
fs.writeFileSync(SEARCH_INDEX_PATH, JSON.stringify(buildSearchIndex()), "utf8");
console.log(`Search index generated at ${path.relative(process.cwd(), SEARCH_INDEX_PATH)}`);
