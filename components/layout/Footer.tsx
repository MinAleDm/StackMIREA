import Link from "next/link";

import { REPO_URL } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background/90">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Practice Make Perfect Docs</p>
        <Link href={REPO_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
          MinAleDm/Practice-Make-Perfect
        </Link>
      </div>
    </footer>
  );
}
