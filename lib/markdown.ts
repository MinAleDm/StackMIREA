import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import type { Plugin } from "unified";
import { unified } from "unified";
import { visit } from "unist-util-visit";

type MdastParent = {
  children: unknown[];
};

type MdastNode = {
  type: string;
  depth?: number;
  lang?: string | null;
  meta?: string | null;
  name?: string;
  children?: unknown[];
};

export interface TocItem {
  id: string;
  title: string;
  depth: 2 | 3;
}

const CALLOUT_TYPES = new Set(["tip", "warning", "info", "note", "important"]);
const CODE_FILENAME_PATTERN = /(?:title|filename)=["']?([^\s"']+)["']?/;
const CODE_HIGHLIGHT_PATTERN = /\{([\d,\s-]+)\}/;

function createMdxAttribute(name: string, value: string) {
  return {
    type: "mdxJsxAttribute",
    name,
    value
  };
}

function parseCodeInfo(lang?: string | null, meta?: string | null) {
  const normalizedLang = lang?.trim() || "text";
  const filenameMatch = meta ? CODE_FILENAME_PATTERN.exec(meta) : null;

  return {
    lang: normalizedLang,
    filename: filenameMatch?.[1],
    highlight: meta ? CODE_HIGHLIGHT_PATTERN.exec(meta)?.[1] : undefined
  };
}

export function createDocsAstPlugin(tocItems: TocItem[] = []): Plugin {
  return () => {
    const slugger = new GithubSlugger();

    return (tree) => {
      visit(tree, (node: unknown, index: number | undefined, parent: unknown) => {
        const typedNode = node as MdastNode;

        if (typedNode.type === "heading" && typedNode.depth === 1) {
          typedNode.depth = 2;
        }

        if (typedNode.type === "heading" && (typedNode.depth === 2 || typedNode.depth === 3)) {
          const title = toString(typedNode).trim();

          if (title) {
            tocItems.push({
              depth: typedNode.depth,
              title,
              id: slugger.slug(title)
            });
          }

          return;
        }

        if (typeof index !== "number" || !parent) {
          return;
        }

        const typedParent = parent as MdastParent;

        if (typedNode.type === "code") {
          const { lang, filename, highlight } = parseCodeInfo(typedNode.lang, typedNode.meta);
          const attributes = [
            createMdxAttribute("lang", lang),
            createMdxAttribute("code", "value" in typedNode && typeof typedNode.value === "string" ? typedNode.value : "")
          ];

          if (filename) {
            attributes.push(createMdxAttribute("filename", filename));
          }
          if (highlight) {
            attributes.push(createMdxAttribute("highlight", highlight));
          }

          typedParent.children[index] = {
            type: "mdxJsxFlowElement",
            name: "CodeBlock",
            attributes,
            children: []
          };
          return;
        }

        if (typedNode.type === "containerDirective" && typedNode.name && CALLOUT_TYPES.has(typedNode.name)) {
          typedParent.children[index] = {
            type: "mdxJsxFlowElement",
            name: "Callout",
            attributes: [createMdxAttribute("type", typedNode.name)],
            children: typedNode.children ?? []
          };
        }
      });
    };
  };
}

export function getMarkdownRemarkPlugins(tocItems: TocItem[] = []) {
  return [remarkGfm, remarkDirective, createDocsAstPlugin(tocItems)] as const;
}

export function extractTableOfContents(markdown: string) {
  const tocItems: TocItem[] = [];
  const processor = unified().use(remarkParse).use(remarkMdx);

  for (const plugin of getMarkdownRemarkPlugins(tocItems)) {
    processor.use(plugin);
  }

  const tree = processor.parse(markdown);
  processor.runSync(tree);

  return tocItems;
}
