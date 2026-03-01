import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

function parseCodeInfo(info: string) {
  const [lang = "text", ...metaParts] = info.trim().split(/\s+/);
  const meta = metaParts.join(" ");
  const filenameMatch = /(?:title|filename)=["']?([^\s"']+)["']?/.exec(meta);

  return {
    lang,
    filename: filenameMatch?.[1]
  };
}

function escapeHtmlAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function transformCodeFences(source: string) {
  const lines = source.split("\n");
  const output: string[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const openFence = /^```(.*)$/.exec(line.trim());

    if (!openFence) {
      output.push(line);
      continue;
    }

    const codeLines: string[] = [];
    index += 1;

    while (index < lines.length && !lines[index].trim().startsWith("```")) {
      codeLines.push(lines[index]);
      index += 1;
    }

    const { lang, filename } = parseCodeInfo(openFence[1] ?? "");
    const code = codeLines.join("\n");
    const filenameAttribute = filename ? ` filename="${escapeHtmlAttribute(filename)}"` : "";

    output.push(`<CodeBlock lang="${escapeHtmlAttribute(lang)}" code={${JSON.stringify(code)}}${filenameAttribute} />`);
  }

  return output.join("\n");
}

function transformAdmonitions(source: string) {
  const lines = source.split("\n");
  const output: string[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    const open = /^:::(tip|warning|info|note)\s*$/.exec(line);

    if (!open) {
      output.push(lines[index]);
      continue;
    }

    const type = open[1];
    const content: string[] = [];
    index += 1;

    while (index < lines.length && lines[index].trim() !== ":::") {
      content.push(lines[index]);
      index += 1;
    }

    output.push(`<Callout type="${type}">`);
    output.push(...content);
    output.push("</Callout>");
  }

  return output.join("\n");
}

function preprocessMdx(source: string) {
  return transformCodeFences(transformAdmonitions(source));
}

const mdxComponents = {
  Callout,
  CodeBlock
};

export async function compileDocMdx(source: string) {
  const transformed = preprocessMdx(source);

  const result = await compileMDX({
    source: transformed,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug]
      }
    },
    components: mdxComponents
  });

  return result.content;
}
