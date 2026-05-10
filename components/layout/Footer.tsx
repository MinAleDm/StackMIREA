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
      { label: "Min’s collective site", href: `${SITE_ORIGIN}/StackMIREA/` },
      { label: "tg/min’s Collective", href: `${REPO_URL}#readme` }
    ]
  },
  {
    title: "GitHub",
    links: [
      { label: `${REPO_OWNER}/${REPO_NAME}`, href: REPO_URL }
    ]
  },
  {
    title: "Социальные сети",
    links: [
      { label: "tg/stackMirea", href: `${REPO_URL}/blob/${DEFAULT_BRANCH}/SUPPORT.md` }
    ]
  }
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-background/95">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-12 xl:grid-cols-[1.05fr_1fr] xl:items-start">
          <div>
            <Link href="/" className="inline-flex items-center gap-4">
              <Image src={siteLogo} alt={`Логотип ${SITE_NAME}`} width={50} height={50} className="h-11 w-11 rounded-sm" />
              <span className="text-[17px] font-medium text-foreground/55">{SITE_NAME}</span>
            </Link>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-[28px] font-semibold tracking-tight text-foreground">{group.title}</h3>
                  <div className="mt-5 space-y-2.5">
                    {group.links.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-[13px] text-foreground/40 underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground/70"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col xl:items-end">
            <p className="text-[2rem] font-semibold tracking-[-0.04em] text-foreground sm:text-[2.35rem] lg:text-[44px] lg:leading-none">
              Упрощаем обучение
            </p>

            <div className="mt-7 inline-flex min-h-[84px] w-full items-center justify-center rounded-[18px] bg-[#3575f6] px-7 py-5 text-center text-[22px] font-semibold uppercase tracking-[0.02em] text-white shadow-[0_20px_48px_rgba(53,117,246,0.24)] sm:text-[26px] lg:max-w-[620px] lg:text-[30px]">
              от студентов для студентов
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <p className="text-right text-[11px] text-foreground/40">
            © 2026 Min&apos;s collective · [Весь контент сайта защищен лицензией{" "}
            <Link href={CONTENT_LICENSE_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2 transition-colors hover:text-foreground/70">
              CC-BY-NC-SA-4.0
            </Link>
            .]
          </p>
        </div>
      </div>
    </footer>
  );
}
