import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, FileCode2, Github, Search, ShieldCheck } from "lucide-react";

import { buildPageMetadata } from "@/lib/seo";
import { REPO_URL } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({ title: "Архитектура платформы", description: "Реальный путь контента StackMIREA от MDX-файла до статической публикации в GitHub Pages.", pathname: "/architecture" });

const stack = [
  ["Next.js 14", "App Router, маршруты и статический export."],
  ["TypeScript", "Строгая типизация компонентов и data layer."],
  ["MDX", "Учебный текст вместе с переиспользуемыми компонентами."],
  ["Shiki", "Build-time подсветка синтаксиса без тяжёлого runtime."],
  ["GitHub Actions", "Проверки качества и воспроизводимая сборка."],
  ["GitHub Pages", "Хостинг готовых статических файлов с basePath."]
];

export default function ArchitecturePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="max-w-3xl"><p className="text-sm font-medium text-primary">Engineering</p><h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Как StackMIREA превращает MDX в статическую образовательную платформу</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">Один pipeline отвечает за навигацию, страницы, поиск и проверку качества — без отдельной CMS и backend.</p></header>

      <section className="mt-12 rounded-3xl border border-border bg-card/60 p-5 sm:p-8" aria-labelledby="flow-title"><h2 id="flow-title" className="text-2xl font-semibold tracking-tight">Путь материала</h2><div className="mt-6 overflow-x-auto"><div className="min-w-[680px] font-mono text-sm"><div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3"><div className="rounded-xl border border-border bg-background p-4"><FileCode2 className="mb-3 size-5 text-primary" />docs/**/*.mdx</div><ArrowRight className="size-5 text-muted-foreground" /><div className="rounded-xl border border-border bg-background p-4"><ShieldCheck className="mb-3 size-5 text-primary" />Validation + manifest</div><ArrowRight className="size-5 text-muted-foreground" /><div className="rounded-xl border border-border bg-background p-4"><Boxes className="mb-3 size-5 text-primary" />Next.js static build</div></div><div className="mx-auto my-3 h-8 w-px bg-border" /><div className="mx-auto grid max-w-xl grid-cols-3 gap-3 text-center"><div className="rounded-xl border border-border bg-background p-3">Navigation</div><div className="rounded-xl border border-border bg-background p-3">Docs pages</div><div className="rounded-xl border border-border bg-background p-3"><Search className="mx-auto mb-1 size-4" />Search index</div></div><div className="mx-auto my-3 h-8 w-px bg-border" /><div className="mx-auto max-w-xs rounded-xl border border-primary/30 bg-primary/5 p-4 text-center"><Github className="mx-auto mb-2 size-5 text-primary" />GitHub Pages</div></div></div></section>

      <section className="mt-12"><h2 className="text-2xl font-semibold tracking-tight">Компоненты pipeline</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{[{ title: "Источник", text: "Только docs/ является каноническим источником учебных материалов." }, { title: "Content manifest", text: "Содержит маршруты, метаданные, TOC, темы, превью и данные для навигации." }, { title: "Поисковый индекс", text: "На build-time материал делится на смысловые фрагменты и получает ключевые слова." }, { title: "Quality gates", text: "CI проверяет frontmatter, дубликаты, ссылки, orphan pages, TypeScript, тесты и build." }].map((item) => <article key={item.title} className="rounded-2xl border border-border bg-card/50 p-5"><h3 className="font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></article>)}</div></section>

      <section className="mt-12"><h2 className="text-2xl font-semibold tracking-tight">Технологии</h2><dl className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/50">{stack.map(([name, description]) => <div key={name} className="grid gap-1 p-4 sm:grid-cols-[180px_1fr]"><dt className="font-medium">{name}</dt><dd className="text-sm leading-6 text-muted-foreground">{description}</dd></div>)}</dl></section>

      <Link href={REPO_URL} target="_blank" rel="noreferrer" className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary">Изучить исходный код <ArrowRight className="size-4" /></Link>
    </div>
  );
}
