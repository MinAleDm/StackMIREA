import Link from "next/link";

import { DEFAULT_BRANCH, REPO_NAME, REPO_OWNER, REPO_URL, SITE_NAME } from "@/lib/utils";

const CONTENT_LICENSE_URL = `${REPO_URL}/blob/${DEFAULT_BRANCH}/CC-BY-NC-SA-4.0`;

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background/90">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 px-4 py-6 text-center text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">
        <p className="break-words">{SITE_NAME} Docs</p>
        <p className="break-words">
          Весь контент сайта защищен лицензией{" "}
          <Link href={CONTENT_LICENSE_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            CC-BY-NC-SA-4.0
          </Link>
          .
        </p>
        <Link
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="break-all transition-colors hover:text-foreground"
        >
          {REPO_OWNER}/{REPO_NAME}
        </Link>
      </div>
    </footer>
  );
}
