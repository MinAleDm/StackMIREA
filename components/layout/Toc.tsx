"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";

interface TocProps {
  items: TocItem[];
}

export function Toc({ items }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (!ids.length) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const visibleHeadings = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);

      if (visibleHeadings[0]?.target.id) {
        setActiveId(visibleHeadings[0].target.id);
      }
    }, {
      rootMargin: "-96px 0px -72% 0px",
      threshold: [0, 0.25, 0.75, 1]
    });

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [ids]);

  if (!items.length) {
    return null;
  }

  return (
    <aside className="hidden xl:block xl:sticky xl:top-[4.5rem] xl:max-h-[calc(100vh-5rem)] xl:overflow-y-auto">
      <div className="rounded-lg border border-border/80 bg-card/60 p-4">
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">На этой странице</h2>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className={item.depth === 3 ? "pl-4" : ""}>
              <Link
                href={`#${item.id}`}
                className={cn(
                  "block text-sm leading-6 transition-colors",
                  activeId === item.id
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function MobileToc({ items }: TocProps) {
  if (!items.length) return null;

  return (
    <details className="mb-8 rounded-xl border border-border bg-card/70 p-4 xl:hidden">
      <summary className="min-h-6 cursor-pointer font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">На этой странице</summary>
      <nav aria-label="Оглавление статьи" className="mt-3 border-t border-border pt-3">
        <ul className="space-y-1">
          {items.map((item) => <li key={item.id} className={item.depth === 3 ? "pl-4" : ""}><Link href={`#${item.id}`} className="flex min-h-11 items-center text-sm text-muted-foreground hover:text-primary">{item.title}</Link></li>)}
        </ul>
      </nav>
    </details>
  );
}
