import fs from "node:fs";
import path from "node:path";

import { z } from "zod";

const gitHubPersonSchema = z.object({
  github: z.string().min(1),
  profileUrl: z.string().url(),
  avatarUrl: z.string().url()
});

const tocItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  depth: z.union([z.literal(2), z.literal(3)])
});

const contentManifestDocSchema = z.object({
  slug: z.array(z.string().min(1)).min(1),
  slugKey: z.string(),
  href: z.string().startsWith("/docs/"),
  title: z.string().min(1),
  description: z.string().min(1),
  author: gitHubPersonSchema,
  order: z.number().int().nonnegative(),
  editPath: z.string().nullable(),
  sourcePath: z.string().nullable(),
  virtualPath: z.string().min(1),
  section: z.string().min(1),
  sectionTitle: z.string().min(1),
  body: z.string(),
  toc: z.array(tocItemSchema),
  preview: z.string(),
  topics: z.array(z.string()),
  anchors: z.array(z.string()),
  hash: z.string().min(1),
  isSectionIndex: z.boolean(),
  isGenerated: z.boolean()
});

const contentManifestSchema = z.object({
  version: z.literal(1),
  generatedAt: z.string().datetime(),
  sourceRoot: z.literal("docs"),
  docs: z.array(contentManifestDocSchema)
});

export type ContentManifestDoc = z.infer<typeof contentManifestDocSchema>;
export type ContentManifest = z.infer<typeof contentManifestSchema>;

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

  const rawManifest = JSON.parse(fs.readFileSync(CONTENT_MANIFEST_PATH, "utf8"));
  cachedManifest = contentManifestSchema.parse(rawManifest);

  return cachedManifest;
}
