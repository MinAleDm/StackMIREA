import fs from "node:fs";
import path from "node:path";

import type { GitHubPerson } from "@/lib/authors";
import type { TocItem } from "@/lib/markdown";

export interface ContentManifestDoc {
  slug: string[];
  slugKey: string;
  href: string;
  title: string;
  description: string;
  author: GitHubPerson;
  order: number;
  editPath: string | null;
  sourcePath: string | null;
  virtualPath: string;
  section: string;
  sectionTitle: string;
  body: string;
  toc: TocItem[];
  preview: string;
  topics: string[];
  anchors: string[];
  hash: string;
  isSectionIndex: boolean;
  isGenerated: boolean;
}

export interface ContentManifest {
  version: number;
  generatedAt: string;
  sourceRoot: string;
  docs: ContentManifestDoc[];
}

const CONTENT_MANIFEST_PATH = path.join(process.cwd(), ".cache", "content-manifest.json");

let cachedManifest: ContentManifest | null = null;

export function getContentManifestPath() {
  return CONTENT_MANIFEST_PATH;
}

export function getContentManifest() {
  if (cachedManifest) {
    return cachedManifest;
  }

  if (!fs.existsSync(CONTENT_MANIFEST_PATH)) {
    throw new Error(
      `Content manifest was not found at ${path.relative(process.cwd(), CONTENT_MANIFEST_PATH)}. Run "npm run prepare:content" first.`
    );
  }

  cachedManifest = JSON.parse(fs.readFileSync(CONTENT_MANIFEST_PATH, "utf8")) as ContentManifest;
  return cachedManifest;
}
