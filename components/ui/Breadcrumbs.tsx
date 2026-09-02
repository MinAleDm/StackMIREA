import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { getDocBreadcrumbParents } from "@/lib/docs-navigation";

interface BreadcrumbsProps {
  slug: string[];
  currentTitle: string;
}

export function Breadcrumbs({ slug, currentTitle }: BreadcrumbsProps) {
  const breadcrumbs = getDocBreadcrumbParents(slug);

  return (
    <nav aria-label="Хлебные крошки" className="mb-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {breadcrumbs.map((item) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {item.href !== "/" ? <ChevronRight className="size-3 opacity-70" /> : null}
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
