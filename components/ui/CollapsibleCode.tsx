import { CodeBlock } from "@/components/ui/CodeBlock";

interface CollapsibleCodeProps {
  code: string;
  lang?: string;
  filename?: string;
  summary?: string;
}

export async function CollapsibleCode({ code, lang = "text", filename, summary = "Показать полный код" }: CollapsibleCodeProps) {
  return (
    <details className="my-8 rounded-xl border border-border bg-card/60 p-3">
      <summary className="min-h-11 cursor-pointer select-none px-2 py-2 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{summary}</summary>
      <div className="[&>figure]:mb-0 [&>figure]:mt-3"><CodeBlock code={code} lang={lang} filename={filename} /></div>
    </details>
  );
}
