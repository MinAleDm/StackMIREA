import { z } from "zod";

const trimmedStringSchema = z.string().trim().min(1);
const optionalTrimmedStringSchema = trimmedStringSchema.optional();
const explicitSlugSchema = z
  .string()
  .trim()
  .regex(/^\/[A-Za-z0-9/_-]*$/, "Slug must start with '/' and contain only URL-safe path segments");

export const githubAuthorSchema = z
  .string()
  .trim()
  .regex(/^(?:@?[A-Za-z0-9-]+|https:\/\/github\.com\/[A-Za-z0-9-]+\/?)$/);

export const docFrontmatterSchema = z
  .object({
    title: optionalTrimmedStringSchema,
    description: optionalTrimmedStringSchema,
    order: z.coerce.number().int().min(0).optional(),
    sidebar_position: z.coerce.number().int().min(0).optional(),
    author: githubAuthorSchema.optional(),
    slug: explicitSlugSchema.optional()
  })
  .passthrough();

export function parseDocFrontmatter(rawFrontmatter) {
  return docFrontmatterSchema.safeParse(rawFrontmatter);
}

export function collectDocFrontmatterIssues(frontmatter, { expectedSlug }) {
  const issues = [];
  const autofixSuggestions = [];

  if (!frontmatter.title) {
    issues.push({
      code: "missing-title",
      path: ["title"],
      message: "Missing required 'title'"
    });
  }

  if (!frontmatter.description) {
    issues.push({
      code: "missing-description",
      path: ["description"],
      message: "Missing required 'description'"
    });
  }

  if (frontmatter.order === undefined && frontmatter.sidebar_position === undefined) {
    issues.push({
      code: "missing-order",
      path: ["order"],
      message: "Either 'order' or 'sidebar_position' is required"
    });
  }

  if (frontmatter.order !== undefined && frontmatter.sidebar_position !== undefined) {
    issues.push({
      code: "conflicting-order-fields",
      path: ["order", "sidebar_position"],
      message: "Use only one of 'order' or 'sidebar_position'"
    });
  }

  if (!frontmatter.author) {
    issues.push({
      code: "missing-author",
      path: ["author"],
      message: "Missing required 'author'"
    });
    autofixSuggestions.push({
      code: "add-author-frontmatter",
      field: "author",
      message: "Add an explicit GitHub author to the frontmatter instead of relying on a fallback"
    });
  }

  if (frontmatter.slug && frontmatter.slug !== expectedSlug) {
    issues.push({
      code: "slug-mismatch",
      path: ["slug"],
      message: `Frontmatter slug '${frontmatter.slug}' does not match the canonical slug '${expectedSlug}'`
    });
    autofixSuggestions.push({
      code: "remove-or-fix-slug",
      field: "slug",
      message: `Remove the custom slug or change it to '${expectedSlug}'`
    });
  }

  return {
    issues,
    autofixSuggestions
  };
}
