import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

import siteLogo from "@/public/favicon.svg";
import { REPO_URL, SITE_NAME } from "@/lib/utils";

const links = [
  { label: "Материалы", href: "/docs" },
  { label: "О проекте", href: "/about" },
  { label: "Архитектура", href: "/architecture" },
  { label: "Добавить материал", href: "/contribute" }
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/45">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold"><Image src={siteLogo} alt="" width={22} height={22} />{SITE_NAME}</Link>
          <nav aria-label="Навигация в подвале"><ul className="flex flex-wrap gap-x-5 gap-y-3">{links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">{link.label}</Link></li>)}<li><Link href={REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"><Github className="size-4" />GitHub</Link></li></ul></nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-border/70 pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>Open-source educational project.</p><p>Код · MIT · Материалы · CC BY-NC-SA 4.0</p></div>
      </div>
    </footer>
  );
}
