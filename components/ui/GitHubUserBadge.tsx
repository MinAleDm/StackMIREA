import Link from "next/link";

import type { GitHubPerson } from "@/lib/authors";
import { cn } from "@/lib/utils";

interface GitHubUserBadgeProps {
  person: GitHubPerson;
  description?: string;
  className?: string;
}

export function GitHubUserBadge({ person, description, className }: GitHubUserBadgeProps) {
  return (
    <Link
      href={person.profileUrl}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-3 rounded-xl border border-border/80 bg-card/60 px-3 py-2 transition-colors hover:border-primary/40",
        className
      )}
    >
      <img
        src={person.avatarUrl}
        alt={`Avatar of ${person.github}`}
        width={40}
        height={40}
        loading="lazy"
        className="size-10 rounded-full border border-border/70 bg-muted object-cover"
      />
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium leading-tight text-foreground">@{person.github}</span>
        {description ? <span className="block text-xs text-muted-foreground">{description}</span> : null}
      </span>
    </Link>
  );
}
