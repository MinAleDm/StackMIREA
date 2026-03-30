import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { toTitleCase } from "@/lib/utils";

interface BreadcrumbsProps {
  slug: string[];
  currentTitle: string;
}

export function Breadcrumbs({ slug, currentTitle }: BreadcrumbsProps) {
  const breadcrumbs = slug.slice(0, -1).map((segment, index) => {
    const href = `/docs/${slug.slice(0, index + 1).join("/")}`;
    return { href, label: toTitleCase(segment) };
  });

  return (
    <nav aria-label="Хлебные крошки" className="mb-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/docs" className="rounded px-1 py-0.5 transition-colors hover:bg-muted/70 hover:text-foreground">
            Документация
          </Link>
        </li>
        {breadcrumbs.map((item) => (
          <li key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className="size-3 opacity-70" />
            <Link
              href={item.href}
              className="rounded px-1 py-0.5 transition-colors hover:bg-muted/70 hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <ChevronRight className="size-3 opacity-70" />
          <span className="text-foreground">{currentTitle}</span>
        </li>
      </ol>
    </nav>
  );
}
