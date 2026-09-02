import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookPlus, Bug, GitPullRequest, Lightbulb, PencilLine } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";
import { cn, DEFAULT_BRANCH, REPO_URL } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({ title: "Помочь StackMIREA", description: "Как добавить учебный материал, исправить ошибку или предложить новое направление StackMIREA.", pathname: "/contribute" });

const ways = [
  { icon: BookPlus, title: "Добавить материал", text: "Опубликовать практику, разбор, notebook или справочник." },
  { icon: PencilLine, title: "Улучшить материал", text: "Уточнить объяснение, обновить код или исправить ссылку." },
  { icon: Bug, title: "Исправить ошибку", text: "Сообщить о проблеме в интерфейсе, поиске или контенте." },
  { icon: Lightbulb, title: "Предложить направление", text: "Описать дисциплину, которой не хватает в каталоге." }
];

export default function ContributePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="max-w-3xl"><p className="text-sm font-medium text-primary">Contribution</p><h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Помочь StackMIREA</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">Выберите небольшой полезный вклад: новый материал, исправление, улучшение существующей страницы или идея для направления.</p></header>
      <section className="mt-10 grid gap-4 sm:grid-cols-2">{ways.map((way) => <article key={way.title} className="rounded-2xl border border-border bg-card/60 p-5"><way.icon className="size-5 text-primary" /><h2 className="mt-4 font-semibold">{way.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{way.text}</p></article>)}</section>

      <section className="mt-14" aria-labelledby="steps-title"><h2 id="steps-title" className="text-2xl font-semibold tracking-tight">Как отправить изменение</h2><ol className="mt-6 space-y-4">{[
        ["Сделайте fork и создайте ветку", `git checkout -b docs/my-material`],
        ["Добавьте или обновите материал", "Учебные исходники находятся только в docs/<track>/."],
        ["Запустите проверки", "npm run quality && npm test && npm run lint && npm run typecheck"],
        ["Проверьте production build", "npm run build"],
        ["Создайте Pull Request", "Опишите цель, изменённые страницы и результаты проверок."]
      ].map(([title, detail], index) => <li key={title} className="grid grid-cols-[36px_1fr] gap-4 rounded-2xl border border-border bg-card/50 p-4"><span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">{index + 1}</span><div><h3 className="font-medium">{title}</h3><code className="mt-2 block overflow-x-auto whitespace-pre rounded-lg bg-muted p-3 text-xs text-muted-foreground">{detail}</code></div></li>)}</ol></section>

      <section className="mt-12 rounded-2xl border border-border bg-card/60 p-6"><h2 className="text-xl font-semibold">Стандарт материала</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Укажите title, description, author и order. По возможности добавьте цели, prerequisites, теорию, задание, объяснение решения, частые ошибки, результат и вопросы для самопроверки. Не помещайте весь разбор в один большой code dump.</p><Link href={`${REPO_URL}/blob/${DEFAULT_BRANCH}/CONTRIBUTING.md`} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary">Полные правила <ArrowRight className="size-4" /></Link></section>

      <div className="mt-8 flex flex-wrap gap-3"><Link href={`${REPO_URL}/fork`} target="_blank" rel="noreferrer" className={buttonVariants()}>Сделать fork <GitPullRequest className="size-4" /></Link><Link href={`${REPO_URL}/issues/new/choose`} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline" }))}>Создать issue</Link></div>
    </div>
  );
}
