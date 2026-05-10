"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Home, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import siteLogo from "@/public/favicon.png";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SITE_NAME, cn } from "@/lib/utils";

const navigation = [
  {
    href: "/",
    label: "Главная",
    icon: Home
  },
  {
    href: "/docs",
    label: "Документация",
    icon: BookOpen
  },
  {
    href: "/ask",
    label: "ИИ-Поиск",
    icon: Search
  }
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[var(--site-header-height)] gap-1.5 py-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-6 md:py-0">
          <div className="flex items-center justify-between md:contents">
            <Link
              href="/"
              className="inline-flex min-w-0 items-center gap-3 md:col-start-1 md:row-start-1 md:justify-self-start"
            >
              <Image
                src={siteLogo}
                alt={`Логотип ${SITE_NAME}`}
                width={48}
                height={48}
                className="h-10 w-10 rounded-sm md:h-12 md:w-12"
                priority
              />
              <span className="truncate text-xl font-medium tracking-tight text-foreground/60">{SITE_NAME}</span>
            </Link>

            <div className="md:col-start-3 md:row-start-1 md:justify-self-end">
              <ThemeToggle className="h-10 w-10 rounded-full text-foreground/55 hover:bg-muted/60 hover:text-foreground md:h-11 md:w-11" />
            </div>
          </div>

          <nav
            aria-label="Основная навигация"
            className="flex items-center gap-1 overflow-x-auto pb-0.5 md:col-start-2 md:row-start-1 md:justify-self-center md:overflow-visible md:pb-0"
          >
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm font-medium transition-colors md:h-10 md:px-4",
                    isActive
                      ? "bg-[#eef3ff] text-[#5c8dff] dark:bg-white/5 dark:text-[#8cb0ff]"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" strokeWidth={2.05} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
