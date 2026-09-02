"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Search, X } from "lucide-react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";

import { useSearchIndex } from "@/components/search/useSearchIndex";
import { runSemanticSearch, tokenizeSearchValue } from "@/lib/search";
import { cn } from "@/lib/utils";

export const SEARCH_DIALOG_EVENT = "stackmirea:open-search";
const examples = ["KNN", "MVC", "SQL", "React", "Hadoop"];

interface SearchDialogEventDetail {
  query?: string;
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  const tokens = useMemo(
    () => tokenizeSearchValue(query).filter((token) => token.length > 1).slice(0, 6),
    [query]
  );

  if (!tokens.length) return <>{text}</>;

  const pattern = new RegExp(`(${tokens.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");

  return (
    <>
      {text.split(pattern).map((part, index) =>
        tokens.some((token) => token.toLocaleLowerCase("ru-RU") === part.toLocaleLowerCase("ru-RU")) ? (
          <mark key={`${part}-${index}`} className="rounded bg-primary/15 px-0.5 text-inherit">{part}</mark>
        ) : (
          <Fragment key={`${part}-${index}`}>{part}</Fragment>
        )
      )}
    </>
  );
}

export function openGlobalSearch(query = "") {
  window.dispatchEvent(new CustomEvent<SearchDialogEventDetail>(SEARCH_DIALOG_EVENT, { detail: { query } }));
}

export function SearchDialog() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { index, error, isLoading } = useSearchIndex(isOpen);
  const results = index && query.trim() ? runSemanticSearch(index, query) : [];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        previousFocusRef.current = document.activeElement as HTMLElement | null;
        setIsOpen(true);
      }
      if (event.key === "Escape") setIsOpen(false);
    }

    function handleOpen(event: Event) {
      const customEvent = event as CustomEvent<SearchDialogEventDetail>;
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setQuery(customEvent.detail?.query ?? "");
      setSelectedIndex(0);
      setIsOpen(true);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(SEARCH_DIALOG_EVENT, handleOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(SEARCH_DIALOG_EVENT, handleOpen);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => setSelectedIndex(0), [query]);

  if (!isOpen) return null;

  function openResult(href: string) {
    setIsOpen(false);
    router.push(href);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((value) => Math.min(value + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((value) => Math.max(value - 1, 0));
    } else if (event.key === "Enter" && results[selectedIndex]) {
      event.preventDefault();
      openResult(results[selectedIndex].doc.href);
    }
  }

  function handleDialogKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab") return;
    const focusable = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-foreground/20 px-3 pt-[8vh] backdrop-blur-sm sm:px-6" role="presentation" onMouseDown={() => setIsOpen(false)}>
      <section role="dialog" aria-modal="true" aria-labelledby="global-search-title" className="flex max-h-[84vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl" onMouseDown={(event) => event.stopPropagation()} onKeyDown={handleDialogKeyDown}>
        <div className="flex items-center gap-3 border-b border-border px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-ring">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <label id="global-search-title" htmlFor="global-search" className="sr-only">Поиск по материалам</label>
          <input ref={inputRef} id="global-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={handleInputKeyDown} placeholder="Найти тему, практику или технологию..." autoComplete="off" className="h-16 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground" />
          <kbd className="hidden rounded border border-border bg-muted px-2 py-1 text-[11px] text-muted-foreground sm:inline">Esc</kbd>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Закрыть поиск" className="inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><X className="size-5" /></button>
        </div>

        <div className="overflow-y-auto p-3 sm:p-4" aria-live="polite">
          {isLoading ? (
            <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground"><Loader2 className="mr-2 size-4 animate-spin" />Загружаю индекс</div>
          ) : error ? (
            <p className="rounded-xl border border-red-300/60 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">{error}</p>
          ) : !query.trim() ? (
            <div className="p-2"><p className="text-sm font-medium">Популярные запросы</p><div className="mt-3 flex flex-wrap gap-2">{examples.map((example) => <button key={example} type="button" onClick={() => setQuery(example)} className="min-h-11 rounded-full border border-border bg-card px-4 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{example}</button>)}</div></div>
          ) : results.length ? (
            <ul role="listbox" aria-label="Результаты поиска" className="space-y-2">
              {results.map((result, resultIndex) => (
                <li key={result.doc.id} role="option" aria-selected={selectedIndex === resultIndex}>
                  <button type="button" onMouseEnter={() => setSelectedIndex(resultIndex)} onClick={() => openResult(result.doc.href)} className={cn("group w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", selectedIndex === resultIndex ? "border-primary/40 bg-primary/5" : "border-transparent hover:bg-muted/60")}> 
                    <div className="flex items-start justify-between gap-4"><span className="min-w-0"><span className="text-xs text-muted-foreground">{result.doc.sectionTitle}{result.heading ? ` · ${result.heading}` : ""}</span><span className="mt-1 block font-semibold text-foreground"><HighlightedText text={result.doc.title} query={query} /></span><span className="mt-1 line-clamp-2 block text-sm leading-6 text-muted-foreground"><HighlightedText text={result.excerpt} query={query} /></span></span><ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" /></div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center"><p className="font-semibold">Ничего не найдено</p><p className="mt-2 text-sm text-muted-foreground">Попробуйте изменить формулировку или найти материал по технологии.</p><Link href="/docs" onClick={() => setIsOpen(false)} className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-primary">Открыть каталог</Link></div>
          )}
        </div>

        <div className="hidden border-t border-border px-4 py-2 text-xs text-muted-foreground sm:flex sm:justify-between"><span>↑ ↓ — выбрать · Enter — открыть</span><span>Полнотекстовый поиск по материалам</span></div>
      </section>
    </div>
  );
}

interface SearchLauncherProps {
  query?: string;
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function SearchLauncher({ query = "", children, className, ariaLabel = "Открыть поиск" }: SearchLauncherProps) {
  return <button type="button" onClick={() => openGlobalSearch(query)} aria-label={ariaLabel} className={className}>{children}</button>;
}
