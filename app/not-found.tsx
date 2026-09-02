import Link from "next/link";
import { Search } from "lucide-react";

import { SearchLauncher } from "@/components/search/SearchDialog";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="mb-3 text-sm uppercase tracking-[0.12em] text-muted-foreground">404</p>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">Материал не найден</h1>
      <p className="mb-8 text-muted-foreground">Страница могла быть перемещена. Попробуйте найти тему или вернуться в каталог.</p>
      <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto">
        <Link
          href="/docs"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground sm:min-w-[130px]"
        >
          Открыть каталог
        </Link>
        <SearchLauncher className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground sm:min-w-[150px]"><Search className="size-4" />Найти материал</SearchLauncher>
      </div>
    </div>
  );
}
