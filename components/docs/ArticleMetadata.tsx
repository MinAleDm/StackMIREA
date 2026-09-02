import Link from "next/link";
import { CalendarDays, Clock3 } from "lucide-react";

import { difficultyLabels, materialTypeLabels } from "@/lib/catalog";
import type { ContentManifestDoc } from "@/lib/content-manifest";

export function ArticleMetadata({ doc }: { doc: ContentManifestDoc }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
      <Link href={`/docs/${doc.section}`} className="rounded-full border border-border bg-card px-3 py-1 text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{doc.sectionTitle}</Link>
      <span>{materialTypeLabels[doc.materialType]}</span>
      <span className="inline-flex items-center gap-1.5"><Clock3 className="size-4" />≈ {doc.estimatedMinutes} мин</span>
      {doc.difficulty ? <span>{difficultyLabels[doc.difficulty]}</span> : null}
      {doc.updatedAt ? <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4" />Обновлено {new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(doc.updatedAt))}</span> : null}
    </div>
  );
}
