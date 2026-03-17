import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PUBLIC_ROOT = path.join(process.cwd(), "public");
const SEARCH_INDEX_PATH = path.join(PUBLIC_ROOT, "search-index.json");
const TOPICS_PATH = path.join(process.cwd(), "lib", "search-topics.json");

const topicDefinitions = JSON.parse(fs.readFileSync(TOPICS_PATH, "utf8"));
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

function walkMarkdownFiles(rootDirectory) {
  const files = [];
  const stack = [rootDirectory];

  while (stack.length > 0) {
    const currentDirectory = stack.pop();

    if (!currentDirectory || !fs.existsSync(currentDirectory)) {
      continue;
    }

    const entries = fs.readdirSync(currentDirectory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

function normalizeSlug(relativePath) {
  const withoutExtension = relativePath.replace(/\.(md|mdx)$/i, "");
  const parts = withoutExtension.split(path.sep);

  if (parts.at(-1) === "index") {
    return parts.slice(0, -1);
  }

  return parts;
}

function toTitleCase(value) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeSearchValue(value) {
  return value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/c\+\+/g, "cpp")
    .replace(/c#/g, "csharp")
    .replace(/model-view-controller/g, "model view controller")
    .replace(/object-oriented/g, "object oriented")
    .replace(/k-nearest/g, "k nearest")
    .replace(/[^\p{L}\p{N}\s#+.-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value) {
  return normalizeSearchValue(value)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function stripMarkdown(source) {
  return source
    .replace(/^import\s.+$/gm, " ")
    .replace(/^export\s.+$/gm, " ")
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```/g, " "))
    .replace(/~~~[\s\S]*?~~~/g, (block) => block.replace(/~~~/g, " "))
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, " $1 ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, " $1 ")
    .replace(/`([^`]+)`/g, " $1 ")
    .replace(/^:::(tip|warning|info|note)\s*$/gm, " ")
    .replace(/^:::\s*$/gm, " ")
    .replace(/^>\s?/gm, "")
    .replace(/[#*_~>-]/g, " ")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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

function findTopics(value) {
  const normalized = normalizeSearchValue(value);

  return topicDefinitions
    .filter((topic) => topic.aliases.some((alias) => normalized.includes(normalizeSearchValue(alias))))
    .map((topic) => topic.id);
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

function createDoc(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const parsed = matter(source);
  const relativePath = path.relative(CONTENT_ROOT, filePath);
  const slug = normalizeSlug(relativePath);
  const section = slug[0] ?? "docs";
  const sectionTitle = toTitleCase(section);
  const title = parsed.data.title?.toString().trim() || toTitleCase(slug.at(-1) ?? section);
  const description = parsed.data.description?.toString().trim() || "";
  const previewSource = stripMarkdown(parsed.content);
  const preview = previewSource.slice(0, 260).trim();
  const docKeywords = [title, description, section, sectionTitle];
  const chunks = createChunks(parsed.content, docKeywords);
  const topics = [...new Set(findTopics(`${title} ${description} ${preview} ${chunks.map((chunk) => `${chunk.heading} ${chunk.text}`).join(" ")}`))];

  return {
    id: slug.join("/") || section,
    href: `/docs/${slug.join("/")}`,
    slug,
    section,
    sectionTitle,
    title,
    description,
    preview,
    keywords: extractKeywords([title, description, preview, ...chunks.map((chunk) => `${chunk.heading} ${chunk.text}`)], 18),
    topics,
    chunks
  };
}

function buildSearchIndex() {
  if (!fs.existsSync(CONTENT_ROOT)) {
    return {
      version: 1,
      generatedAt: new Date().toISOString(),
      docs: []
    };
  }

  const docs = walkMarkdownFiles(CONTENT_ROOT)
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
