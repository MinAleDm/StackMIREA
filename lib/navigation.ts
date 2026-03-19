import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type { GitHubPerson } from "@/lib/authors";
import { getDefaultDocAuthor, toGitHubPerson } from "@/lib/authors";
import { getTrackOrder, getTrackTitle } from "@/lib/tracks";
import { toTitleCase } from "@/lib/utils";

export interface DocFrontmatter {
  title?: string;
  description?: string;
  order?: number;
  sidebar_position?: number;
  author?: string;
}

export interface DocEntry {
  slug: string[];
  slugKey: string;
  href: string;
  title: string;
  description: string;
  order: number;
  editPath: string | null;
  section: string;
  body: string;
  author: GitHubPerson;
  isSectionIndex: boolean;
  isGenerated: boolean;
}

export interface SidebarGroup {
  id: string;
  title: string;
  items: Array<{
    title: string;
    href: string;
    order: number;
  }>;
}

interface DocsIndex {
  docs: DocEntry[];
  docsBySlug: Map<string, DocEntry>;
  docOrderBySlug: Map<string, number>;
  sidebarGroups: SidebarGroup[];
}

const CONTENT_ROOT = path.join(process.cwd(), "content");
const DOCS_SOURCE_ROOT = path.join(process.cwd(), "docs");

let cachedDocsIndex: DocsIndex | null = null;

function walkMarkdownFiles(rootDirectory: string) {
  const files: string[] = [];
  const stack = [rootDirectory];

  while (stack.length > 0) {
    const currentDirectory = stack.pop();

    if (!currentDirectory) {
      break;
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

function normalizeSlug(relativePath: string) {
  const withoutExtension = relativePath.replace(/\.(md|mdx)$/i, "");
  const parts = withoutExtension.split(path.sep);

  if (parts.at(-1) === "index") {
    return parts.slice(0, -1);
  }

  return parts;
}

function getSectionOrder(section: string) {
  return getTrackOrder(section);
}

function getSlugKey(slug: string[]) {
  return slug.join("/");
}

function compareDocs(left: DocEntry, right: DocEntry) {
  const sectionDelta = getSectionOrder(left.section) - getSectionOrder(right.section);
  if (sectionDelta !== 0) {
    return sectionDelta;
  }

  if (left.section !== right.section) {
    return left.section.localeCompare(right.section);
  }

  if (left.order !== right.order) {
    return left.order - right.order;
  }

  if (left.isSectionIndex !== right.isSectionIndex) {
    return left.isSectionIndex ? -1 : 1;
  }

  return left.title.localeCompare(right.title);
}

function resolveEditPath(relativePath: string) {
  const candidates =
    relativePath === path.join("algorithms", "getting-started.mdx")
      ? ["intro.mdx", "intro.md"]
      : [relativePath, relativePath.replace(/\.mdx$/i, ".md")];

  for (const candidate of candidates) {
    const absoluteCandidatePath = path.join(DOCS_SOURCE_ROOT, candidate);

    if (fs.existsSync(absoluteCandidatePath)) {
      return candidate.replace(/\\/g, "/");
    }
  }

  return null;
}

function createDocEntry(filePath: string): DocEntry {
  const source = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(source);
  const relativePath = path.relative(CONTENT_ROOT, filePath);
  const slug = normalizeSlug(relativePath);
  const slugKey = getSlugKey(slug);
  const section = slug[0] ?? "docs";
  const isSectionIndex = slug.length === 1;
  const parsedOrder = Number(parsed.data.order ?? parsed.data.sidebar_position);
  const safeOrder = Number.isFinite(parsedOrder) ? parsedOrder : isSectionIndex ? 0 : 9999;
  const title = parsed.data.title?.toString().trim() || toTitleCase(slug.at(-1) ?? section);
  const description = parsed.data.description?.toString().trim() || "";
  const rawAuthor = parsed.data.author?.toString().trim();
  const author = rawAuthor ? toGitHubPerson(rawAuthor) : getDefaultDocAuthor();
  const editPath = resolveEditPath(relativePath);

  return {
    slug,
    slugKey,
    href: `/docs/${slug.join("/")}`,
    title,
    description,
    order: safeOrder,
    editPath,
    section,
    body: parsed.content,
    author,
    isSectionIndex,
    isGenerated: editPath === null
  };
}

function createSidebarGroups(docs: DocEntry[]) {
  const groupsMap = new Map<string, SidebarGroup>();

  for (const doc of docs) {
    const section = doc.section;
    const group = groupsMap.get(section) ?? {
      id: section,
      title: getTrackTitle(section),
      items: []
    };

    if (doc.isSectionIndex) {
      group.title = doc.title;
    }

    group.items.push({
      title: doc.title,
      href: doc.href,
      order: doc.order
    });

    groupsMap.set(section, group);
  }

  return [...groupsMap.values()]
    .sort((left, right) => {
      const orderDelta = getSectionOrder(left.id) - getSectionOrder(right.id);
      if (orderDelta !== 0) {
        return orderDelta;
      }
      return left.title.localeCompare(right.title);
    })
    .map((group) => ({
      ...group,
      items: group.items.sort((left, right) => {
        if (left.order !== right.order) {
          return left.order - right.order;
        }
        return left.title.localeCompare(right.title);
      })
    }));
}

function buildDocsIndex(): DocsIndex {
  if (!fs.existsSync(CONTENT_ROOT)) {
    return {
      docs: [],
      docsBySlug: new Map(),
      docOrderBySlug: new Map(),
      sidebarGroups: []
    };
  }

  const docs = walkMarkdownFiles(CONTENT_ROOT).map(createDocEntry).sort(compareDocs);
  const docsBySlug = new Map<string, DocEntry>();
  const docOrderBySlug = new Map<string, number>();

  docs.forEach((doc, index) => {
    docsBySlug.set(doc.slugKey, doc);
    docOrderBySlug.set(doc.slugKey, index);
  });

  return {
    docs,
    docsBySlug,
    docOrderBySlug,
    sidebarGroups: createSidebarGroups(docs)
  };
}

function getDocsIndex() {
  if (!cachedDocsIndex) {
    cachedDocsIndex = buildDocsIndex();
  }

  return cachedDocsIndex;
}

export function getAllDocs() {
  return getDocsIndex().docs;
}

export function getDocBySlug(slug: string[]) {
  return getDocsIndex().docsBySlug.get(getSlugKey(slug)) ?? null;
}

export function getSidebarGroups() {
  return getDocsIndex().sidebarGroups;
}

export function getDocPagination(slug: string[]) {
  const indexState = getDocsIndex();
  const slugKey = getSlugKey(slug);
  const docIndex = indexState.docOrderBySlug.get(slugKey);

  if (docIndex === undefined) {
    return { prev: null, next: null };
  }

  const prevDoc = indexState.docs[docIndex - 1];
  const nextDoc = indexState.docs[docIndex + 1];

  return {
    prev: prevDoc ? { title: prevDoc.title, href: prevDoc.href } : null,
    next: nextDoc ? { title: nextDoc.title, href: nextDoc.href } : null
  };
}
