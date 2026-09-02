import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  Bug,
  Github,
  Heart,
  Lightbulb,
  MessagesSquare,
  Scale,
  ShieldCheck
} from "lucide-react";

import siteLogo from "@/public/favicon.svg";
import { DEFAULT_BRANCH, REPO_URL, SITE_NAME } from "@/lib/utils";

const CODE_LICENSE_URL = `${REPO_URL}/blob/${DEFAULT_BRANCH}/LICENSE`;
const CONTENT_LICENSE_URL = `${REPO_URL}/blob/${DEFAULT_BRANCH}/CC-BY-NC-SA-4.0`;
const SUPPORT_URL = `${REPO_URL}/blob/${DEFAULT_BRANCH}/SUPPORT.md`;
const SECURITY_URL = `${REPO_URL}/blob/${DEFAULT_BRANCH}/SECURITY.md`;

const footerSections = [
  {
    title: "Платформа",
    links: [
      { label: "Документация", href: "/docs", external: false },
      { label: "Спроси StackMIREA", href: "/ask", external: false },
      { label: "Авторы и команды", href: "/#contributors", external: false },
      { label: "История изменений", href: `${REPO_URL}/blob/${DEFAULT_BRANCH}/CHANGELOG.md`, external: true }
    ]
  },
  {
    title: "Сообщество",
    links: [
      { label: "Добавить материал", href: `${REPO_URL}/compare?expand=1`, external: true },
      { label: "Открытые задачи", href: `${REPO_URL}/issues`, external: true },
      { label: "Pull requests", href: `${REPO_URL}/pulls`, external: true },
      { label: "GitHub", href: REPO_URL, external: true }
    ]
  },
  {
    title: "Контакты",
    links: [
      { label: "Центр поддержки", href: SUPPORT_URL, external: true },
      {
        label: "Сообщить об ошибке",
        href: `${REPO_URL}/issues/new?template=bug_report.yml`,
        external: true
      },
      {
        label: "Предложить идею",
        href: `${REPO_URL}/issues/new?template=feature_request.yml`,
        external: true
      },
      { label: "Безопасность", href: SECURITY_URL, external: true }
    ]
  }
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-card/55">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="pointer-events-none absolute -right-32 top-16 size-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col gap-5 rounded-2xl border border-primary/20 bg-primary px-5 py-6 text-primary-foreground shadow-lg shadow-primary/10 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="max-w-2xl">
            <p className="text-lg font-semibold tracking-tight sm:text-xl">Есть идея для StackMIREA?</p>
            <p className="mt-1 text-sm leading-6 text-primary-foreground/75">
              Предложите улучшение, новый учебный материал или помогите сделать платформу удобнее.
            </p>
          </div>
          <Link
            href={`${REPO_URL}/issues/new/choose`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-background px-5 text-sm font-semibold text-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            Связаться с командой
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3 text-foreground">
              <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border/80 bg-background/80 shadow-sm">
                <Image src={siteLogo} alt="" width={24} height={24} />
              </span>
              <span className="text-lg font-semibold tracking-tight">{SITE_NAME}</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Открытая платформа с практиками, разбором задач и учебными материалами по ключевым IT-дисциплинам.
            </p>
            <Link
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Github className="size-3.5" aria-hidden="true" />
              Open source на GitHub
            </Link>
          </div>

          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h2 className="text-sm font-semibold text-foreground">{section.title}</h2>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                      {link.external ? (
                        <ArrowUpRight
                          className="size-3 opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="grid gap-3 border-t border-border/70 py-6 sm:grid-cols-2">
          <Link
            href={CODE_LICENSE_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-border/70 bg-background/55 p-4 transition-colors hover:border-primary/35 hover:bg-background/80"
          >
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Scale className="size-4" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-foreground">Исходный код · MIT</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">Свободное использование и развитие проекта</span>
            </span>
            <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
          </Link>

          <Link
            href={CONTENT_LICENSE_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-border/70 bg-background/55 p-4 transition-colors hover:border-primary/35 hover:bg-background/80"
          >
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpenText className="size-4" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-foreground">Материалы · CC BY-NC-SA 4.0</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">С указанием авторства, некоммерчески</span>
            </span>
            <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-col gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE_NAME}. Открытый образовательный проект.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <MessagesSquare className="size-3.5" aria-hidden="true" />
              Обратная связь
            </Link>
            <Link href={`${REPO_URL}/issues/new?template=bug_report.yml`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Bug className="size-3.5" aria-hidden="true" />
              Ошибка
            </Link>
            <Link href={`${REPO_URL}/issues/new?template=feature_request.yml`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Lightbulb className="size-3.5" aria-hidden="true" />
              Идея
            </Link>
            <Link href={SECURITY_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              Безопасность
            </Link>
            <span className="inline-flex items-center gap-1.5">
              Сделано сообществом
              <Heart className="size-3.5 text-primary" fill="currentColor" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
