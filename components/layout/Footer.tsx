import Image from "next/image";
import Link from "next/link";

import siteLogo from "@/public/favicon.png";
import { DEFAULT_BRANCH, REPO_NAME, REPO_OWNER, REPO_URL, SITE_NAME, SITE_ORIGIN } from "@/lib/utils";

const CONTENT_LICENSE_URL = `${REPO_URL}/blob/${DEFAULT_BRANCH}/CC-BY-NC-SA-4.0`;
const footerGroups = [
  {
    title: "Продукт",
    links: [
      { label: "Сообщить об ошибках", href: `${REPO_URL}/issues/new/choose` }
    ]
  },
  {
    title: "О нас",
    links: [
      { label: "Сайт проекта", href: `${SITE_ORIGIN}/StackMIREA/` },
      { label: "README", href: `${REPO_URL}#readme` }
    ]
  },
  {
    title: "GitHub",
    links: [
      { label: `${REPO_OWNER}/${REPO_NAME}`, href: REPO_URL },
      { label: `@${REPO_OWNER}`, href: `https://github.com/${REPO_OWNER}` }
    ]
  },
  {
    title: "Сообщество",
    links: [
      { label: "CONTRIBUTING", href: `${REPO_URL}/blob/${DEFAULT_BRANCH}/CONTRIBUTING.md` },
      { label: "SUPPORT", href: `${REPO_URL}/blob/${DEFAULT_BRANCH}/SUPPORT.md` }
    ]
  }
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-background/95">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 xl:grid-cols-[1.15fr_1fr]">
          <div className="grid gap-8 lg:grid-cols-[220px_repeat(4,minmax(0,1fr))]">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <Image src={siteLogo} alt={`Логотип ${SITE_NAME}`} width={42} height={42} className="h-10 w-10 rounded-sm" />
                <span className="text-base font-medium text-foreground/60">{SITE_NAME}</span>
              </Link>
            </div>

            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">{group.title}</h3>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {group.links.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-5">
            <div>
              <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">Упрощаем обучение</p>
            </div>

            <div className="rounded-[20px] bg-[#3575f6] px-6 py-5 text-center text-2xl font-semibold tracking-tight text-white shadow-[0_20px_48px_rgba(53,117,246,0.28)] sm:text-5xl">
              от студентов для студентов
            </div>

            <p className="text-xs text-muted-foreground">
              © 2026 Min&apos;s collective. Весь контент сайта защищен лицензией{" "}
              <Link href={CONTENT_LICENSE_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
                CC-BY-NC-SA-4.0
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
