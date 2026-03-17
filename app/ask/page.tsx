import type { Metadata } from "next";
import { BrainCircuit, Sparkles } from "lucide-react";

import { AskStackMirea } from "@/components/search/AskStackMirea";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Спроси StackMIREA",
  description: "Семантический поиск по материалам StackMIREA: темы, практики, сравнение дисциплин и быстрый вход в нужные страницы."
};

export default function AskPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-14 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/65 px-6 py-12 sm:px-10">
        <div className="pointer-events-none absolute -right-12 top-0 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative max-w-4xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3.5" />
            Новый способ навигации по StackMIREA
          </p>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Семантический поиск и
            <br />
            “Спроси StackMIREA”
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            Ищи не только по заголовкам. Формулируй вопрос естественным языком, а движок подберёт материалы по теме,
            смыслу и совпадающим фрагментам внутри документации.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-background/70 px-4 py-2 text-sm text-muted-foreground">
            <BrainCircuit className="size-4 text-primary" />
            Подходит для запросов вроде `KNN`, `pandas`, `MVC vs OOP`, `регрессия`, `SQL`
          </div>
        </div>
      </section>

      <section className="mt-8">
        <AskStackMirea />
      </section>
    </div>
  );
}
