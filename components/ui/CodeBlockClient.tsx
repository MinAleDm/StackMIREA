"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface CodeBlockClientProps {
  code: string;
  html: string;
  filename?: string;
  language?: string;
}

export function CodeBlockClient({ code, html, filename, language }: CodeBlockClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border/80 bg-card">
      <figcaption className="flex items-center justify-between border-b border-border/80 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
        <span className="truncate font-medium">{filename ?? language ?? "фрагмент"}</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 px-2 text-xs">
          {copied ? <Check className="mr-1 size-3" /> : <Copy className="mr-1 size-3" />}
          {copied ? "Скопировано" : "Копировать"}
        </Button>
      </figcaption>
      <div className="overflow-x-auto p-4 text-sm leading-6" dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
