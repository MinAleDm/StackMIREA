import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

interface MaterialCardProps {
  title: string;
  href: string;
  description: string;
  sectionTitle: string;
  typeLabel: string;
  estimatedMinutes: number;
  dateLabel?: string;
  badge?: string;
}

export function MaterialCard({ title, href, description, sectionTitle, typeLabel, estimatedMinutes, dateLabel, badge }: MaterialCardProps) {
  return (
    <Link href={href} className="group flex h-full flex-col rounded-2xl border border-border/80 bg-card/65 p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><span className="rounded-full border border-border bg-background px-2.5 py-1">{sectionTitle}</span><span>{typeLabel}</span>{badge ? <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">{badge}</span> : null}</div>
      <h3 className="mt-4 text-base font-semibold leading-6 tracking-tight text-foreground">{title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{description}</p>
      <div className="mt-auto flex items-end justify-between gap-3 pt-5 text-xs text-muted-foreground"><span className="flex flex-wrap items-center gap-x-3 gap-y-1"><span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" />≈ {estimatedMinutes} мин</span>{dateLabel ? <span>{dateLabel}</span> : null}</span><ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" /></div>
    </Link>
  );
}
