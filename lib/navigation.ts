import { getContentManifest } from "@/lib/content-manifest";
import type { ContentManifestDoc } from "@/lib/content-manifest";
import { getTrackOrder, getTrackTitle } from "@/lib/tracks";

export type DocEntry = ContentManifestDoc;
export type PublishedDocEntry = DocEntry & { isSectionIndex: false };
export type EditableDocEntry = PublishedDocEntry & { editPath: string };

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

let cachedDocsIndex: DocsIndex | null = null;

export function isPublishedDoc(doc: DocEntry): doc is PublishedDocEntry {
  return !doc.isSectionIndex && doc.status === "published";
}

export function hasEditableSource(doc: PublishedDocEntry): doc is EditableDocEntry {
  return typeof doc.editPath === "string" && doc.editPath.length > 0;
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
    .filter((group) => group.items.length > 1)
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
  const docs = [...getContentManifest().docs].sort(compareDocs);
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

export function getPublishedDocs() {
  return getDocsIndex().docs.filter(isPublishedDoc);
}

export function getEditableDocs() {
  return getPublishedDocs().filter(hasEditableSource);
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
  const currentDoc = indexState.docsBySlug.get(slugKey);

  if (!currentDoc || currentDoc.isSectionIndex || currentDoc.status !== "published") {
    return { prev: null, next: null };
  }

  const courseDocs = indexState.docs.filter(
    (doc) => doc.section === currentDoc.section && !doc.isSectionIndex && doc.status === "published"
  );
  const docIndex = courseDocs.findIndex((doc) => doc.slugKey === slugKey);
  const prevDoc = courseDocs[docIndex - 1];
  const nextDoc = courseDocs[docIndex + 1];

  return {
    prev: prevDoc ? { title: prevDoc.title, href: prevDoc.href } : null,
    next: nextDoc ? { title: nextDoc.title, href: nextDoc.href } : null
  };
}
