import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import type { ReactNode } from "react";

import { CourseProgress } from "@/components/docs/CourseProgress";
import { materialTypeLabels, type CourseRoadmapGroup, type TrackOverview } from "@/lib/catalog";

interface CourseOverviewProps {
  track: TrackOverview;
  roadmap: CourseRoadmapGroup[];
  introduction: ReactNode;
}

export function CourseOverview({ track, roadmap, introduction }: CourseOverviewProps) {
  const materials = roadmap.flatMap((group) => group.materials);

  return (
    <>
      <header className="mb-8 border-b border-border/70 pb-8">
        <p className="text-sm font-medium text-primary">Учебное направление</p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">{track.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">{track.description}</p>
        <div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full border border-border bg-card px-3 py-1 text-sm">{track.materialsCount} материалов</span>{track.topics.map((topic) => <span key={topic} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">{topic}</span>)}</div>
      </header>

      {materials.length ? <CourseProgress materialIds={materials.map((material) => material.href)} /> : null}

      <section className="mt-8" aria-labelledby="course-overview-title">
        <h2 id="course-overview-title" className="text-2xl font-semibold tracking-tight">О курсе</h2>
        <div className="docs-prose mt-4">{introduction}</div>
      </section>

      <section className="mt-12" aria-labelledby="course-roadmap-title">
        <div><h2 id="course-roadmap-title" className="text-2xl font-semibold tracking-tight">Маршрут курса</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Идите по порядку или сразу откройте нужную тему.</p></div>
        {materials.length ? <div className="mt-6 space-y-8">
          {roadmap.map((group) => (
            <section key={group.title}>
              <div className="mb-3"><h3 className="text-lg font-semibold">{group.title}</h3><p className="mt-1 text-sm text-muted-foreground">{group.description}</p></div>
              <ol className="overflow-hidden rounded-2xl border border-border bg-card/60">
                {group.materials.map((material) => (
                  <li key={material.href} className="border-b border-border/70 last:border-b-0">
                    <Link href={material.href} className="group flex min-h-16 items-center gap-4 p-4 transition-colors hover:bg-muted/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-muted-foreground">{material.order}</span>
                      <span className="min-w-0 flex-1"><span className="block text-sm font-medium text-foreground group-hover:text-primary">{material.title}</span><span className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground"><span>{materialTypeLabels[material.materialType]}</span><span className="inline-flex items-center gap-1"><Clock3 className="size-3" />≈ {material.estimatedMinutes} мин</span></span></span>
                      <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div> : <div className="mt-6 rounded-2xl border border-dashed border-border bg-muted/25 p-6"><p className="font-medium">В этом направлении пока нет опубликованных материалов.</p><p className="mt-2 text-sm text-muted-foreground">Посмотрите другие направления или предложите первый материал.</p><div className="mt-4 flex flex-wrap gap-4"><Link href="/docs" className="inline-flex min-h-11 items-center text-sm font-medium text-primary">Посмотреть направления</Link><Link href="/contribute" className="inline-flex min-h-11 items-center text-sm font-medium text-primary">Предложить материал</Link></div></div>}
      </section>
    </>
  );
}
