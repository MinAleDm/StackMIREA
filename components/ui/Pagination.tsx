import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationDoc {
  title: string;
  href: string;
}

interface PaginationProps {
  prev: PaginationDoc | null;
  next: PaginationDoc | null;
}

export function Pagination({ prev, next }: PaginationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <div className="mt-14 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group rounded-lg border border-border/80 bg-card px-4 py-3 transition-colors hover:border-primary/50"
        >
          <div className="mb-1 flex items-center text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <ArrowLeft className="mr-1 size-3" />
            Previous
          </div>
          <div className="line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
            {prev.title}
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group rounded-lg border border-border/80 bg-card px-4 py-3 text-right transition-colors hover:border-primary/50"
        >
          <div className="mb-1 flex items-center justify-end text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Next
            <ArrowRight className="ml-1 size-3" />
          </div>
          <div className="line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
            {next.title}
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </div>
  );
}
