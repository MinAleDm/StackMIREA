import { cache } from "react";
import { bundledLanguages, codeToHtml } from "shiki";

import { CodeBlockClient } from "@/components/ui/CodeBlockClient";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  highlight?: string;
}

const highlight = cache(async (code: string, lang: string) => {
  const normalizedLang = lang in bundledLanguages ? (lang as keyof typeof bundledLanguages) : "text";

  return codeToHtml(code, {
    lang: normalizedLang,
    themes: {
      light: "github-light",
      dark: "github-dark"
    }
  });
});

function parseHighlightedLines(value?: string) {
  const lines = new Set<number>();
  for (const part of value?.split(",") ?? []) {
    const [start, end = start] = part.trim().split("-").map(Number);
    if (!Number.isInteger(start) || !Number.isInteger(end)) continue;
    for (let line = start; line <= end; line += 1) lines.add(line);
  }
  return lines;
}

export async function CodeBlock({ code, lang = "text", filename, highlight: highlightValue }: CodeBlockProps) {
  let html = await highlight(code, lang);
  const highlightedLines = parseHighlightedLines(highlightValue);
  let lineNumber = 0;
  html = html.replace(/<span class="line">/g, (value) => {
    lineNumber += 1;
    return highlightedLines.has(lineNumber) ? '<span class="line highlighted">' : value;
  });

  return <CodeBlockClient code={code} html={html} filename={filename} language={lang} />;
}
