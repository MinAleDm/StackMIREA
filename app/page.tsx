import Link from "next/link";
import { ArrowRight, Bot, Brain, BrainCircuit, Code2, Database, ExternalLink, GitPullRequest, ListChecks, Sigma, Users } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn, REPO_URL } from "@/lib/utils";
import { getTrackDefinitions, type TrackIconKey } from "@/lib/tracks";

export const dynamic = "force-static";

const iconByKey: Record<TrackIconKey, typeof Bot> = {
  bot: Bot,
  brain: Brain,
  code2: Code2,
  database: Database,
  gitPullRequest: GitPullRequest,
  listChecks: ListChecks,
  sigma: Sigma
};

const tracks = getTrackDefinitions().map((track) => ({
  ...track,
  href: `/docs/${track.id}`,
  icon: iconByKey[track.iconKey]
}));

const publicationRules = [
  {
    title: "Публикуй материал в нужный трек",
    description: "Размещай файл в соответствующем разделе документации и соблюдай структуру текущего трека."
  },
  {
    title: "Соблюдай единый формат",
    description: "Используй понятную структуру: цель, шаги решения, код, результат и краткие выводы."
  },
  {
    title: "Оформляй кодовые примеры",
    description: "Добавляй язык в код-блоки и оставляй только воспроизводимые, проверенные фрагменты."
  },
  {
    title: "Фиксируй контекст и источники",
    description: "Если материал опирается на внешние источники, обязательно оставляй ссылки и пояснения."
  },
  {
    title: "Проверяй изменения перед PR",
    description: "Перед публикацией запускай `npm run lint` и `npm run typecheck`, чтобы не ломать сборку."
  }
];

const pullRequestLinks = [
  {
    title: "Создать Pull Request",
    href: `${REPO_URL}/compare?expand=1`,
    description: "Откроет форму сравнения веток и создания PR для публикации."
  },
  {
    title: "Все Pull Request",
    href: `${REPO_URL}/pulls`,
    description: "Список открытых и закрытых PR по проекту."
  },
  {
    title: "Открытые Pull Request",
    href: `${REPO_URL}/pulls?q=is%3Apr+is%3Aopen`,
    description: "Быстрый фильтр для проверки, что уже находится на ревью."
  }
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-14 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/65 px-6 py-14 sm:px-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <Brain className="size-3.5" />
            Центр документации StackMIREA
          </p>

          <h1
            className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground opacity-0 sm:text-6xl"
            style={{ animation: "fade-up 720ms ease-out forwards", animationDelay: "120ms" }}
          >
            Практики и ноутбуки
            <br />
            в едином формате docs
          </h1>

          <p
            className="mt-6 max-w-3xl text-pretty text-base leading-7 text-muted-foreground opacity-0 sm:text-lg"
            style={{ animation: "fade-up 720ms ease-out forwards", animationDelay: "220ms" }}
          >
            Учебные материалы StackMIREA по ключевым IT-дисциплинам. Каждая страница оформлена как техническая
            документация с кодом, разбором и привязкой к исходникам.
          </p>

          <div
            className="mt-8 flex flex-col gap-3 opacity-0 sm:flex-row"
            style={{ animation: "fade-up 720ms ease-out forwards", animationDelay: "320ms" }}
          >
            <Link href="/docs" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
              Открыть документацию
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/authors"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full border-border/80 bg-background/70 sm:w-auto")}
            >
              <Users className="size-4" />
              Авторы
            </Link>
            <Link
              href="/ask"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full border-border/80 bg-background/70 sm:w-auto")}
            >
              <BrainCircuit className="size-4" />
              Спроси StackMIREA
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-border/70 bg-card/70 p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
              <BrainCircuit className="size-3.5" />
              Бета семантического поиска
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Новая навигация по материалам</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              Задай вопрос естественным языком и найди нужные практики по теме, инструменту или сравнению дисциплин.
              Например: `где есть KNN`, `покажи материалы по pandas`, `сравни MVC и OOP`.
            </p>
          </div>

          <Link href="/ask" className={cn(buttonVariants({ size: "lg" }), "w-full rounded-2xl lg:w-auto")}>
            Открыть "Спроси StackMIREA"
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {tracks.map((track, index) => {
          const Icon = track.icon;
          return (
            <Link
              key={track.title}
              href={track.href}
              className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card/70 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card sm:p-5"
              style={{ animation: "fade-up 660ms ease-out forwards", animationDelay: `${120 + index * 100}ms` }}
            >
              <div className="mb-4 inline-flex rounded-lg border border-border/70 bg-background/70 p-2 text-muted-foreground transition-colors group-hover:text-primary">
                <Icon className="size-5" />
              </div>
              <h2 className="break-words text-base font-semibold leading-snug tracking-tight">{track.title}</h2>
              <p className="mt-2 break-words text-sm leading-6 text-muted-foreground">{track.homeSubtitle}</p>
              <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm text-primary">
                Перейти
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          );
        })}
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-border/70 bg-card/70 p-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <ListChecks className="size-3.5" />
            Правила публикации
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Как публиковать материалы в StackMIREA</h2>
          <ol className="mt-5 space-y-4">
            {publicationRules.map((rule, index) => (
              <li key={rule.title} className="flex gap-3 rounded-xl border border-border/70 bg-background/60 p-4">
                <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{rule.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{rule.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-2xl border border-border/70 bg-card/70 p-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <GitPullRequest className="size-3.5" />
            Публикация через PR
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Ссылки на Pull Request</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Для публикации открывай PR с изменениями в документации. В описании укажи, что именно добавлено и в каком
            треке лежит материал.
          </p>

          <div className="mt-5 space-y-3">
            {pullRequestLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-3 rounded-xl border border-border/70 bg-background/60 p-4 transition-colors hover:border-primary/40"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">{item.description}</span>
                </span>
                <ExternalLink className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
