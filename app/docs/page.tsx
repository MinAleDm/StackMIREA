import type { Metadata } from "next";

import { CatalogExplorer } from "@/components/catalog/CatalogExplorer";
import { MobileDocsMenu } from "@/components/layout/MobileDocsMenu";
import { getBuildInfo } from "@/lib/build-info";
import { getCatalogStats, getTrackOverviews } from "@/lib/catalog";
import { getSidebarGroups } from "@/lib/navigation";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Каталог учебных материалов",
  description: "Практики, ноутбуки и разборы StackMIREA по Java, AI, Big Data, Python и другим IT-дисциплинам.",
  pathname: "/docs"
});

export default function DocsIndexPage() {
  const tracks = getTrackOverviews();
  const stats = getCatalogStats();

  return (
    <>
      <MobileDocsMenu buildInfo={getBuildInfo()} groups={getSidebarGroups()} currentPath="/docs" />
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header className="mb-8 max-w-3xl">
          <p className="text-sm font-medium text-primary">Каталог StackMIREA</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">Выберите дисциплину и откройте нужный материал</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">В каталоге {stats.materialsCount} материалов в {stats.populatedTracksCount} наполненных направлениях. Используйте поиск по технологии или быстрый фильтр по дисциплине.</p>
        </header>
        <CatalogExplorer tracks={tracks} />
      </div>
    </>
  );
}
