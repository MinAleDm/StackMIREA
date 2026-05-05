"use client";

import Link from "next/link";
import { ArrowRight, BookOpenText, BrainCircuit, Loader2, Search, Sparkles } from "lucide-react";
import { type FormEvent, startTransition, useDeferredValue, useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { buildAskSummary, getSuggestedQueries, getTopicDefinitions, prepareSearchIndex, runSemanticSearch } from "@/lib/search";
import type { SearchIndexPayload } from "@/lib/search-types";
import { cn, withBasePath } from "@/lib/utils";

const suggestedQueries = getSuggestedQueries();
const topicDefinitions = getTopicDefinitions().slice(0, 8);

export function AskStackMirea() {
  const [index, setIndex] = useState<ReturnType<typeof prepareSearchIndex> | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    let isMounted = true;

    async function loadIndex() {
      try {
        const response = await fetch(withBasePath("/search-index.json"));

        if (!response.ok) {
          throw new Error(`Search index request failed with status ${response.status}`);
        }

        const payload = (await response.json()) as SearchIndexPayload;

        if (!isMounted) {
          return;
        }

        setIndex(prepareSearchIndex(payload));
        setError("");
      } catch {
        if (!isMounted) {
          return;
        }

        setError("Не удалось загрузить поисковый индекс. Проверь сборку `npm run search:build`.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadIndex();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasQuery = deferredQuery.trim().length > 0;
  const results = hasQuery && index ? runSemanticSearch(index, deferredQuery) : [];
  const summary = hasQuery ? buildAskSummary(deferredQuery, results) : null;
  const relatedTopicIds: string[] = [];

  for (const result of results) {
    for (const topicId of result.matchedTopics) {
      if (!relatedTopicIds.includes(topicId)) {
        relatedTopicIds.push(topicId);
      }

      if (relatedTopicIds.length >= 6) {
        break;
      }
    }

    if (relatedTopicIds.length >= 6) {
      break;
    }
  }

  function applyQuery(nextQuery: string) {
    startTransition(() => {
      setQuery(nextQuery);
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applyQuery(query.trim());
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="rounded-3xl border border-border/70 bg-card/70 p-6 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3.5" />
              Semantic-style search over StackMIREA content
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Спроси StackMIREA</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Формулируй вопрос как человек: по теме, инструменту, подходу или сравнению между дисциплинами.
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm text-muted-foreground">
            {index ? (
              <>
                <span className="font-medium text-foreground">{index.docs.length}</span> документов в локальном индексе
              </>
            ) : (
              "Индекс загружается"
            )}
          </div>
        </div>

        <form className="mt-6 rounded-3xl border border-border/70 bg-background/80 p-3 shadow-sm" onSubmit={handleSubmit}>
          <label htmlFor="ask-stackmirea" className="sr-only">
            Поиск по материалам StackMIREA
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="ask-stackmirea"
                type="search"
                value={query}
                onChange={(event) => applyQuery(event.target.value)}
                placeholder="Например: где в материалах есть про KNN?"
                autoComplete="off"
                className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            <Button type="submit" size="lg" className="h-12 rounded-2xl px-6">
              <BrainCircuit className="size-4" />
              Найти ответ
            </Button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {suggestedQueries.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => applyQuery(suggestion)}
              className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="mt-6 min-h-[240px]">
          {isLoading ? (
            <div className="flex min-h-[240px] items-center justify-center rounded-3xl border border-dashed border-border/80 bg-background/40 text-sm text-muted-foreground">
              <Loader2 className="mr-2 size-4 animate-spin" />
              Загружаю индекс материалов
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50/70 p-5 text-sm text-red-700">{error}</div>
          ) : !hasQuery ? (
            <div className="rounded-3xl border border-dashed border-border/80 bg-background/40 p-6">
              <h3 className="text-lg font-semibold tracking-tight">Что умеет поиск</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
                  <p className="text-sm font-medium text-foreground">Поиск по смыслу</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Учитывает тему, описание, секцию, содержательные фрагменты и словарь синонимов.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
                  <p className="text-sm font-medium text-foreground">Ответ с контекстом</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Возвращает не только страницы, но и наиболее релевантные куски внутри публикаций.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {summary ? (
                <article className="rounded-3xl border border-primary/15 bg-primary/5 p-5">
                  <p className="text-sm font-semibold text-foreground">{summary.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{summary.body}</p>
                </article>
              ) : null}

              {results.length > 0 ? (
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <article key={result.doc.id} className="rounded-3xl border border-border/70 bg-background/70 p-5 transition-colors hover:border-primary/30">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span className="rounded-full border border-border/70 bg-card px-2 py-1">#{index + 1}</span>
                            <span>{result.doc.sectionTitle}</span>
                            {result.heading ? <span>• {result.heading}</span> : null}
                          </div>
                          <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{result.doc.title}</h3>
                          {result.doc.description ? (
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">{result.doc.description}</p>
                          ) : null}
                          <p className="mt-3 rounded-2xl border border-border/60 bg-card/70 px-4 py-3 text-sm leading-6 text-foreground">
                            {result.excerpt}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {result.reasons.map((reason) => (
                              <span key={reason} className="rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs text-muted-foreground">
                                {reason}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Link
                          href={result.doc.href}
                          className={cn(buttonVariants({ variant: "outline" }), "shrink-0 rounded-2xl border-border/80 bg-card/70")}
                        >
                          Открыть материал
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-border/80 bg-background/40 p-6 text-sm text-muted-foreground">
                  По запросу пока ничего релевантного не нашлось. Попробуй назвать инструмент, метод или дисциплину короче.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <aside className="space-y-4">
        <section className="rounded-3xl border border-border/70 bg-card/70 p-5">
          <p className="text-sm font-semibold tracking-tight">Популярные темы</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {topicDefinitions.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => applyQuery(topic.label)}
                className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {topic.label}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-border/70 bg-card/70 p-5">
          <p className="text-sm font-semibold tracking-tight">Как это работает</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
            <li>Индекс собирается на build-time из content manifest и остаётся совместимым с GitHub Pages.</li>
            <li>Поиск учитывает title, description, секцию, чанки контента и словарь тематических синонимов.</li>
            <li>Результаты ранжируются так, чтобы сверху были страницы с самым близким фрагментом по смыслу.</li>
          </ul>
        </section>

        {relatedTopicIds.length > 0 ? (
          <section className="rounded-3xl border border-border/70 bg-card/70 p-5">
            <p className="text-sm font-semibold tracking-tight">Связанные темы</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {relatedTopicIds.map((topicId) => {
                const topic = topicDefinitions.find((item) => item.id === topicId);

                if (!topic) {
                  return null;
                }

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => applyQuery(topic.label)}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/10"
                  >
                    {topic.label}
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="rounded-3xl border border-border/70 bg-card/70 p-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <BookOpenText className="size-3.5" />
            Нужна полная навигация?
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Если знаешь дисциплину, но не знаешь конкретную страницу, начни с общего каталога треков.
          </p>
          <Link href="/docs" className={cn(buttonVariants({ variant: "outline" }), "mt-4 w-full rounded-2xl border-border/80 bg-background/70")}>
            Перейти в каталог docs
          </Link>
        </section>
      </aside>
    </div>
  );
}
