import Link from "next/link";
import { ArrowRight, Bot, Brain, Code2, Database, GitPullRequest, ListChecks, Sigma } from "lucide-react";

import type { TrackOverview } from "@/lib/catalog";
import type { TrackIconKey } from "@/lib/tracks";
import { cn } from "@/lib/utils";

const iconByKey: Record<TrackIconKey, typeof Bot> = {
  bot: Bot,
  brain: Brain,
  code2: Code2,
  database: Database,
  gitPullRequest: GitPullRequest,
  listChecks: ListChecks,
  sigma: Sigma
};

interface TrackCardProps {
  track: TrackOverview;
  compact?: boolean;
}

export function TrackCard({ track, compact = false }: TrackCardProps) {
  const Icon = iconByKey[track.iconKey];

  return (
    <Link href={track.href} className={cn("group flex h-full flex-col rounded-2xl border border-border/80 bg-card/70 transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", compact ? "p-5" : "p-6")}>
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border/70 bg-background/70 text-muted-foreground transition-colors group-hover:text-primary"><Icon className="size-5" aria-hidden="true" /></span>
        <span className="rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">{track.materialsCount} {track.materialsCount === 1 ? "материал" : "материалов"}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{track.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{track.description}</p>
      {track.topics.length ? <div className="mt-4 flex flex-wrap gap-2">{track.topics.map((topic) => <span key={topic} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{topic}</span>)}</div> : null}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary">Открыть курс <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
    </Link>
  );
}
