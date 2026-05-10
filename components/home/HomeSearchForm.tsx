"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { withBasePath } from "@/lib/utils";

interface HomeSearchFormProps {
  defaultValue?: string;
}

export function HomeSearchForm({ defaultValue = "" }: HomeSearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedQuery = query.trim();
    const url = normalizedQuery ? `${withBasePath("/ask")}?q=${encodeURIComponent(normalizedQuery)}` : withBasePath("/ask");

    router.push(url);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-[24px] border border-[#d7e2ff] bg-white/92 p-3 shadow-[0_16px_40px_rgba(79,124,214,0.10)] dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-col gap-3 md:flex-row">
        <label htmlFor="home-search-input" className="relative flex-1">
          <span className="sr-only">Поиск по материалам StackMIREA</span>
          <Search className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            id="home-search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Где в материалах есть про KNN"
            className="h-12 w-full rounded-[18px] border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#4f7cf6] dark:border-white/10 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
          />
        </label>

        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-[14px] bg-[#3575f6] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#2868ea]"
        >
          Найти ответ
        </button>
      </div>
    </form>
  );
}
