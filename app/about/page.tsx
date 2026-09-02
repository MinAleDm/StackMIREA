import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText, Code2, Github, Search } from "lucide-react";

import { GitHubUserBadge } from "@/components/ui/GitHubUserBadge";
import { buttonVariants } from "@/components/ui/button";
import { getAuthorsWithSummary } from "@/lib/contributors";
import { buildPageMetadata } from "@/lib/seo";
import { cn, REPO_URL } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({ title: "О проекте", description: "Зачем существует StackMIREA, для кого он сделан и как устроена открытая база учебных материалов.", pathname: "/about" });

export default function AboutPage() {
  const authors = getAuthorsWithSummary();
  const maintainer = authors.find((author) => author.github.toLowerCase() === "minkinad");
  const contributors = authors.filter((author) => author.github.toLowerCase() !== "minkinad");

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="max-w-3xl"><p className="text-sm font-medium text-primary">О проекте</p><h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">StackMIREA превращает разрозненные учебные файлы в понятную базу знаний</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">Это открытая статическая платформа с практиками, ноутбуками и разборами по IT-дисциплинам РТУ МИРЭА.</p></header>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[{ icon: BookOpenText, title: "Для студентов", text: "Чтобы быстро найти тему, пройти материалы по порядку и вернуться к нужному фрагменту." }, { icon: Search, title: "Для самостоятельного обучения", text: "Чтобы искать по содержимому, а не помнить название дисциплины или файла." }, { icon: Code2, title: "Для авторов", text: "Чтобы публиковать воспроизводимые материалы в одном проверяемом формате." }].map((item) => <article key={item.title} className="rounded-2xl border border-border bg-card/60 p-5"><item.icon className="size-5 text-primary" /><h2 className="mt-4 font-semibold">{item.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></article>)}
      </div>

      <section className="mt-14 border-t border-border pt-10"><h2 className="text-2xl font-semibold tracking-tight">Почему появился проект</h2><p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Полезные практики часто остаются в локальных папках, чатах и отдельных репозиториях. StackMIREA сохраняет их в читаемом MDX-формате, строит единый каталог и делает содержание доступным через поиск.</p></section>

      <section className="mt-12"><h2 className="text-2xl font-semibold tracking-tight">Как устроен контент</h2><p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Канонические материалы находятся в <code className="rounded bg-muted px-1.5 py-0.5">docs/</code>. Перед публикацией проверяются метаданные, внутренние ссылки, структура треков и поисковый индекс. Сайт собирается статически и не требует аккаунта или backend.</p><Link href="/architecture" className={cn(buttonVariants({ variant: "outline" }), "mt-5")}>Посмотреть архитектуру <ArrowRight className="size-4" /></Link></section>

      <section id="team" className="mt-14 border-t border-border pt-10"><h2 className="text-2xl font-semibold tracking-tight">Команда</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Роли отражают реальный вклад в проект без корпоративной иерархии.</p>{maintainer ? <div className="mt-6 max-w-md rounded-2xl border border-border bg-card/60 p-5"><h3 className="font-semibold">Alexander Minkin</h3><GitHubUserBadge person={maintainer} description="Creator & Maintainer" className="mt-3" /><p className="mt-3 text-sm leading-6 text-muted-foreground">Разработка платформы, сопровождение контента и публикация проекта.</p></div> : null}{contributors.length ? <div className="mt-6"><h3 className="text-lg font-semibold">Участники</h3><div className="mt-3 grid gap-3 sm:grid-cols-2">{contributors.map((author) => <div key={author.github} className="rounded-xl border border-border bg-card/50 p-4"><GitHubUserBadge person={author} description="Content Contributor" /><p className="mt-2 text-xs text-muted-foreground">{author.docsCount} публикаций</p></div>)}</div></div> : null}</section>

      <section className="mt-14 rounded-3xl border border-border bg-card/60 p-6 sm:p-8"><Github className="size-6 text-primary" /><h2 className="mt-4 text-2xl font-semibold tracking-tight">Open Source</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">Исходный код открыт по MIT, учебные материалы — по CC BY-NC-SA 4.0. Предложения и исправления принимаются через GitHub.</p><Link href={REPO_URL} target="_blank" rel="noreferrer" className={cn(buttonVariants(), "mt-5")}>Открыть репозиторий <ArrowRight className="size-4" /></Link></section>
    </div>
  );
}
