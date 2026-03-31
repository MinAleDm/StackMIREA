import Link from "next/link";
import Image from "next/image";
import { BookOpenText, BrainCircuit, Github, Home } from "lucide-react";

import siteLogo from "@/public/favicon.png";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { REPO_URL, SITE_NAME } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/92 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
            <Image src={siteLogo} alt={`Логотип ${SITE_NAME}`} width={20} height={20} className="rounded-sm" priority />
            <span className="hidden truncate sm:inline">{SITE_NAME}</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              href="/"
              aria-label="Главная"
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            >
              <Home className="size-4" />
              <span>Главная</span>
            </Link>
            <Link
              href="/docs"
              aria-label="Документация"
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            >
              <BookOpenText className="size-4" />
              <span>Документация</span>
            </Link>
            <Link
              href="/ask"
              aria-label="Спроси StackMIREA"
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            >
              <BrainCircuit className="size-4" />
              <span>Спросить</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
          >
            <Github className="size-4" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
