import type { Metadata } from "next";
import Link from "next/link";
import { PenSquare } from "lucide-react";
import { notFound } from "next/navigation";

import { getBuildInfo } from "@/lib/build-info";
import { MobileDocsMenu } from "@/components/layout/MobileDocsMenu";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileToc, Toc } from "@/components/layout/Toc";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GitHubUserBadge } from "@/components/ui/GitHubUserBadge";
import { Pagination } from "@/components/ui/Pagination";
import { ArticleMetadata } from "@/components/docs/ArticleMetadata";
import { CourseOverview } from "@/components/docs/CourseOverview";
import { MaterialCompletion } from "@/components/docs/CourseProgress";
import { getCourseRoadmap, getTrackOverviews } from "@/lib/catalog";
import { compileDocMdx } from "@/lib/mdx";
import { getAllDocs, getDocBySlug, getDocPagination, getSidebarGroups } from "@/lib/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { GITHUB_EDIT_ROOT } from "@/lib/utils";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDocs().map((doc) => ({ slug: doc.slug }));
}

export function generateMetadata({ params }: DocPageProps): Metadata {
  const doc = getDocBySlug(params.slug);

  if (!doc) {
    return {};
  }

  return buildPageMetadata({
    title: doc.title,
    description: doc.description || `Материал StackMIREA: ${doc.title}`,
    pathname: doc.href
  });
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = getDocBySlug(params.slug);

  if (!doc) {
    notFound();
  }

  const buildInfo = getBuildInfo();
  const sidebarGroups = getSidebarGroups();
  const pagination = getDocPagination(params.slug);
  const { content } = await compileDocMdx(doc.body, { collectToc: false });
  const editUrl = doc.editPath ? `${GITHUB_EDIT_ROOT}/${doc.editPath}` : null;
  const track = getTrackOverviews().find((item) => item.id === doc.section);

  if (doc.isSectionIndex && track) {
    return (
      <>
        <MobileDocsMenu buildInfo={buildInfo} groups={sidebarGroups} currentPath={doc.href} />
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[280px_minmax(0,1fr)_220px]">
          <Sidebar buildInfo={buildInfo} groups={sidebarGroups} currentPath={doc.href} />
          <article className="min-w-0 max-w-4xl pb-16">
            <Breadcrumbs slug={params.slug} currentTitle={doc.title} />
            <CourseOverview track={track} roadmap={getCourseRoadmap(doc.section)} introduction={content} />
          </article>
          <aside className="hidden xl:block" aria-label="Сводка курса"><div className="sticky top-20 rounded-xl border border-border bg-card/60 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Курс</p><p className="mt-2 text-sm font-medium">{track.title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{track.materialsCount} опубликованных материалов</p></div></aside>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileDocsMenu buildInfo={buildInfo} groups={sidebarGroups} currentPath={doc.href} />

      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[280px_minmax(0,1fr)_220px]">
        <Sidebar buildInfo={buildInfo} groups={sidebarGroups} currentPath={doc.href} />

        <article className="min-w-0 max-w-4xl pb-16">
          <Breadcrumbs slug={params.slug} currentTitle={doc.title} />

          <header className="mb-10 border-b border-border/70 pb-7">
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{doc.title}</h1>
            {doc.description ? <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{doc.description}</p> : null}
            <div className="mt-5"><ArticleMetadata doc={doc} /></div>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <GitHubUserBadge person={doc.author} description="Автор публикации" />
              <MaterialCompletion materialId={doc.href} />
            </div>
            {editUrl ? (
              <Link
                href={editUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm text-primary transition-opacity hover:opacity-80"
              >
                <PenSquare className="size-4" />
                Редактировать источник
              </Link>
            ) : (
              <p className="mt-5 text-sm text-muted-foreground">
                Эта страница собрана автоматически, поэтому редактирование доступно через исходные материалы раздела.
              </p>
            )}
          </header>

          <MobileToc items={doc.toc} />
          <div className="docs-prose">{content}</div>

          <Pagination prev={pagination.prev} next={pagination.next} course={{ title: doc.sectionTitle, href: `/docs/${doc.section}` }} />
        </article>

        <Toc items={doc.toc} />
      </div>
    </>
  );
}
