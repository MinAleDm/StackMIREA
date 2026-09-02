"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { TrackCard } from "@/components/cards/TrackCard";
import type { TrackOverview } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface CatalogExplorerProps {
  tracks: TrackOverview[];
}

export function CatalogExplorer({ tracks }: CatalogExplorerProps) {
  const populated = tracks.filter((track) => track.materialsCount > 0);
  const upcoming = tracks.filter((track) => track.materialsCount === 0);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const visibleTracks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ru-RU");
    return populated.filter((track) => {
      const matchesFilter = filter === "all" || track.id === filter;
      const searchable = `${track.title} ${track.description} ${track.topics.join(" ")}`.toLocaleLowerCase("ru-RU");
      return matchesFilter && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [filter, populated, query]);

  return (
    <>
      <section aria-label="Фильтры каталога" className="rounded-2xl border border-border/80 bg-card/60 p-4 sm:p-5">
        <label htmlFor="catalog-search" className="sr-only">Поиск направления</label>
        <div className="relative"><Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input id="catalog-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти направление или технологию..." className="h-12 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/20" /></div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Направления">
          <button type="button" onClick={() => setFilter("all")} aria-pressed={filter === "all"} className={cn("min-h-11 shrink-0 rounded-full border px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", filter === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:text-foreground")}>Все</button>
          {populated.map((track) => <button key={track.id} type="button" onClick={() => setFilter(track.id)} aria-pressed={filter === track.id} className={cn("min-h-11 shrink-0 rounded-full border px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", filter === track.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:text-foreground")}>{track.title}</button>)}
        </div>
      </section>

      {visibleTracks.length ? <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visibleTracks.map((track) => <TrackCard key={track.id} track={track} />)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-border p-8 text-center"><p className="font-medium">Направление не найдено</p><p className="mt-2 text-sm text-muted-foreground">Попробуйте изменить запрос или сбросить фильтр.</p><button type="button" onClick={() => { setFilter("all"); setQuery(""); }} className="mt-4 min-h-11 text-sm font-medium text-primary">Показать все направления</button></div>}

      {upcoming.length ? (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-2xl font-semibold tracking-tight">Скоро появятся</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Направления уже запланированы, но в них пока нет опубликованных материалов.</p>
          <details className="mt-5 rounded-2xl border border-dashed border-border bg-muted/25 p-4">
            <summary className="cursor-pointer list-none text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Показать направления в разработке <span className="ml-2 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">{upcoming.length}</span></summary>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{upcoming.map((track) => <div key={track.id} className="rounded-xl border border-border/70 bg-background/50 p-4"><div className="flex items-start justify-between gap-3"><p className="text-sm font-medium text-foreground">{track.title}</p><span className="shrink-0 rounded-full bg-muted px-2 py-1 text-[11px] text-muted-foreground">В разработке</span></div><p className="mt-2 text-xs leading-5 text-muted-foreground">{track.description}</p></div>)}</div>
          </details>
        </section>
      ) : null}
    </>
  );
}
