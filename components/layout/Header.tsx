"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpenText, Github, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import siteLogo from "@/public/favicon.svg";
import { SearchDialog, SearchLauncher } from "@/components/search/SearchDialog";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { REPO_URL, SITE_NAME } from "@/lib/utils";

const navigation = [
  { href: "/docs", label: "Материалы" },
  { href: "/about", label: "О проекте" },
  { href: "/contribute", label: "Добавить материал" }
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-7">
          <Link href="/" className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Image src={siteLogo} alt="" width={22} height={22} className="rounded-sm" priority />
            <span className="truncate">{SITE_NAME}</span>
          </Link>
          <nav aria-label="Основная навигация" className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-10 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{item.label}</Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <SearchLauncher className="hidden h-10 min-w-52 items-center justify-between gap-4 rounded-lg border border-border bg-card/70 px-3 text-sm text-muted-foreground transition-colors hover:border-primary/35 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex">
            <span className="inline-flex items-center gap-2"><Search className="size-4" />Поиск</span><kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">⌘/Ctrl K</kbd>
          </SearchLauncher>
          <SearchLauncher className="inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"><Search className="size-5" /></SearchLauncher>
          <ThemeToggle />
          <Link href={REPO_URL} target="_blank" rel="noreferrer" aria-label="GitHub" className="hidden size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"><Github className="size-4" /></Link>
          <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} className="inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden">{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-navigation" aria-label="Мобильная навигация" className="border-t border-border bg-background px-4 py-3 md:hidden">
          <div className="mx-auto grid max-w-[1440px] gap-1">
            {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center rounded-lg px-3 text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><BookOpenText className="mr-3 size-4 text-muted-foreground" />{item.label}</Link>)}
            <Link href={REPO_URL} target="_blank" rel="noreferrer" className="flex min-h-11 items-center rounded-lg px-3 text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Github className="mr-3 size-4 text-muted-foreground" />GitHub</Link>
          </div>
        </nav>
      ) : null}
      <SearchDialog />
    </header>
  );
}
