import { cache } from "react";
import { bundledLanguages, codeToHtml } from "shiki";

import { CodeBlockClient } from "@/components/ui/CodeBlockClient";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
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

export async function CodeBlock({ code, lang = "text", filename }: CodeBlockProps) {
  const html = await highlight(code, lang);

  return <CodeBlockClient code={code} html={html} filename={filename} language={lang} />;
}
