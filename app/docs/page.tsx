import Link from "next/link";
import { ArrowRight, Bot, Brain, Code2, Database, GitPullRequest, ListChecks, Sigma } from "lucide-react";

import { MobileDocsMenu } from "@/components/layout/MobileDocsMenu";
import { getBuildInfo } from "@/lib/build-info";
import { getAllDocs, getSidebarGroups } from "@/lib/navigation";
import { getTrackDefinitions, type TrackIconKey } from "@/lib/tracks";

export const dynamic = "force-static";

const iconByKey: Record<TrackIconKey, typeof Bot> = {
  bot: Bot,
  brain: Brain,
  code2: Code2,
  database: Database,
  gitPullRequest: GitPullRequest,
  listChecks: ListChecks,
  sigma: Sigma
};

export default function DocsIndexPage() {
  const buildInfo = getBuildInfo();
  const groups = getSidebarGroups();
  const itemCountByGroup = getAllDocs()
    .filter((doc) => !doc.isSectionIndex)
    .reduce((counts, doc) => counts.set(doc.section, (counts.get(doc.section) ?? 0) + 1), new Map<string, number>());
  const tracks = getTrackDefinitions().map((track) => ({
    ...track,
    href: `/docs/${track.id}`,
    icon: iconByKey[track.iconKey],
    itemsCount: itemCountByGroup.get(track.id) ?? 0
  }));

  return (
    <>
      <MobileDocsMenu buildInfo={buildInfo} groups={groups} currentPath="/docs" />

      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Документация StackMIREA: актуальные треки</h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Здесь собраны учебные направления проекта. Открывайте нужный трек и переходите к практикам, ноутбукам и
            методическим материалам без перегруженного списка на входе.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {tracks.map((track) => {
            const Icon = track.icon;

            return (
              <Link
                key={track.id}
                href={track.href}
                className="group flex h-full flex-col rounded-2xl border border-border/80 bg-card/70 p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="inline-flex rounded-xl border border-border/70 bg-background/70 p-3 text-muted-foreground transition-colors group-hover:text-primary">
                    <Icon className="size-5" />
                  </div>
                  <span className="rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                    {track.itemsCount} материалов
                  </span>
                </div>

                <h2 className="text-lg font-semibold tracking-tight">{track.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{track.homeSubtitle}</p>

                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm text-primary">
                  Открыть трек
                  <ArrowRight className="size-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
