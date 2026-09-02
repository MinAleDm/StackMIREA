"use client";

import { Search } from "lucide-react";

import { SearchLauncher } from "@/components/search/SearchDialog";

const examples = ["KNN", "MVC", "SQL", "React", "Hadoop"];

export function HeroSearch() {
  return (
    <div className="mt-8 max-w-3xl">
      <SearchLauncher className="flex min-h-16 w-full items-center gap-3 rounded-2xl border border-input bg-background px-4 text-left shadow-sm transition-colors hover:border-primary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-5">
        <Search className="size-5 shrink-0 text-primary" />
        <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground sm:text-base">Найти тему, практику или технологию...</span>
        <kbd className="hidden rounded-lg border border-border bg-muted px-2 py-1 text-xs text-muted-foreground sm:inline">⌘/Ctrl K</kbd>
      </SearchLauncher>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>Например:</span>
        {examples.map((example) => <SearchLauncher key={example} query={example} ariaLabel={`Найти ${example}`} className="min-h-11 rounded-full border border-border bg-background/70 px-3 transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{example}</SearchLauncher>)}
      </div>
    </div>
  );
}
