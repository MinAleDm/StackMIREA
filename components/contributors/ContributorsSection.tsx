import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GitHubUserBadge } from "@/components/ui/GitHubUserBadge";
import type { TeamMember } from "@/lib/authors";
import type { AuthorWithSummary } from "@/lib/contributors";
import { cn } from "@/lib/utils";

interface ContributorsSectionProps {
  authors: AuthorWithSummary[];
  productTeam: TeamMember[];
  contentManagers: TeamMember[];
  devTeam: TeamMember[];
  title: string;
  description: string;
  className?: string;
  sectionId?: string;
}

export function ContributorsSection({
  authors,
  productTeam,
  contentManagers,
  devTeam,
  title,
  description,
  className,
  sectionId
}: ContributorsSectionProps) {
  return (
    <section id={sectionId} className={cn("space-y-8", className)}>
      <header>
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-3xl text-base text-muted-foreground">{description}</p>
      </header>

      <div>
        <h3 className="mb-4 text-xl font-semibold tracking-tight">Авторы</h3>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {authors.map((author) => (
            <Link
              key={author.github}
              href={author.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border/80 bg-card/70 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={author.avatarUrl}
                    alt={`Avatar of ${author.github}`}
                    width={48}
                    height={48}
                    loading="lazy"
                    className="size-12 rounded-full border border-border/70 bg-muted object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold tracking-tight text-foreground">@{author.github}</p>
                    <p className="text-sm text-muted-foreground">{author.docsCount} публикаций</p>
                  </div>
                </div>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">{author.summary}</p>

              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm text-primary">
                Открыть профиль
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 sm:p-8">
        <div className="grid gap-8 xl:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-semibold tracking-tight">StackMirea Product</h3>
            <div className="grid gap-3">
              {productTeam.map((member) => (
                <GitHubUserBadge key={`product-${member.github}`} person={member} description={member.role} className="w-full justify-start" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold tracking-tight">Content Managers</h3>
            <div className="grid gap-3">
              {contentManagers.map((member) => (
                <GitHubUserBadge
                  key={`content-${member.github}`}
                  person={member}
                  description={member.role}
                  className="w-full justify-start"
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold tracking-tight">Developers Group</h3>
            <div className="grid gap-3">
              {devTeam.map((member) => (
                <GitHubUserBadge key={`dev-${member.github}`} person={member} description={member.role} className="w-full justify-start" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
