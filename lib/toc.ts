import GithubSlugger from "github-slugger";

import { type TocItem } from "@/components/layout/Toc";

function normalizeHeading(rawHeading: string) {
  return rawHeading
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/#+$/g, "")
    .trim();
}

export function extractTableOfContents(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  const lines = markdown.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    const match = /^(##|###)\s+(.+)$/.exec(line.trim());
    if (!match) {
      continue;
    }

    const depth = match[1].length as 2 | 3;
    const title = normalizeHeading(match[2]);

    if (!title) {
      continue;
    }

    items.push({
      depth,
      title,
      id: slugger.slug(title)
    });
  }

  return items;
}
