import Link from "next/link";
import Image from "next/image";
import { BookOpenText, Github, Home, Users } from "lucide-react";

import { REPO_URL, SITE_NAME } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/92 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
            <Image src="/favicon.png" alt={`${SITE_NAME} logo`} width={20} height={20} className="rounded-sm" priority />
            {SITE_NAME}
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            <Link
              href="/"
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            >
              <Home className="size-4" />
              Home
            </Link>
            <Link
              href="/docs"
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            >
              <BookOpenText className="size-4" />
              Docs
            </Link>
            <Link
              href="/authors"
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            >
              <Users className="size-4" />
              Authors
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-1">
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
