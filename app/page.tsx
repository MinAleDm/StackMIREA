import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText, Github, GitPullRequest, Search, Sparkles } from "lucide-react";

import { MaterialCard } from "@/components/cards/MaterialCard";
import { TrackCard } from "@/components/cards/TrackCard";
import { HeroSearch } from "@/components/home/HeroSearch";
import { SearchLauncher } from "@/components/search/SearchDialog";
import { buttonVariants } from "@/components/ui/button";
import { getCatalogStats, getTrackOverviews } from "@/lib/catalog";
import { buildPageMetadata } from "@/lib/seo";
import { formatWhatsNewDate, getWhatsNewOverview } from "@/lib/whats-new";
import { cn, REPO_URL } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Учебные материалы МИРЭА",
  description: "Практики, разборы, ноутбуки и код по IT-дисциплинам МИРЭА — в едином каталоге с полнотекстовым поиском.",
  pathname: "/"
});

export default function HomePage() {
  const tracks = getTrackOverviews();
  const populatedTracks = tracks.filter((track) => track.materialsCount > 0);
  const stats = getCatalogStats();
  const recentMaterials = getWhatsNewOverview().materials;

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-8 sm:px-6 sm:pt-12 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/70 px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/75 px-3 py-1 text-xs text-muted-foreground"><BookOpenText className="size-3.5" />Открытая база знаний для студентов МИРЭА</p>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Учебные материалы МИРЭА без хаоса в файлах и репозиториях</h1>
          <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">Практики, разборы, ноутбуки и код по IT-дисциплинам — в едином каталоге с полнотекстовым поиском.</p>

          <HeroSearch />

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchLauncher className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}><Search className="size-4" />Найти материал</SearchLauncher>
            <Link href="/docs" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full bg-background/70 sm:w-auto")}>Открыть каталог <ArrowRight className="size-4" /></Link>
            <Link href="/contribute" className="inline-flex min-h-11 items-center justify-center px-3 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:justify-start">Как добавить материал →</Link>
          </div>
        </div>
      </section>

      <section aria-label="Статистика платформы" className="grid grid-cols-2 border-x border-b border-border/70 bg-card/40 sm:grid-cols-4">
        <div className="border-b border-r border-border/70 p-4 sm:border-b-0 sm:p-5"><strong className="block text-xl font-semibold">{stats.materialsCount}</strong><span className="text-xs text-muted-foreground sm:text-sm">материалов</span></div>
        <div className="border-b border-border/70 p-4 sm:border-b-0 sm:border-r sm:p-5"><strong className="block text-xl font-semibold">{stats.populatedTracksCount}</strong><span className="text-xs text-muted-foreground sm:text-sm">направлений</span></div>
        <div className="border-r border-border/70 p-4 sm:p-5"><strong className="block text-sm font-semibold sm:text-base">Полнотекстовый</strong><span className="text-xs text-muted-foreground sm:text-sm">поиск по содержимому</span></div>
        <div className="p-4 sm:p-5"><strong className="block text-sm font-semibold sm:text-base">Open Source</strong><span className="text-xs text-muted-foreground sm:text-sm">открытый проект</span></div>
      </section>

      <section className="mt-16" aria-labelledby="directions-title">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-medium text-primary">Основные направления</p><h2 id="directions-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Начните с дисциплины</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Здесь показаны только направления с опубликованными материалами.</p></div><Link href="/docs" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary">Весь каталог <ArrowRight className="size-4" /></Link></div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{populatedTracks.map((track) => <TrackCard key={track.id} track={track} compact />)}</div>
      </section>

      <section className="mt-16" aria-labelledby="recent-title">
        <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-medium text-primary">Новое и обновлённое</p><h2 id="recent-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Последние материалы</h2></div><Sparkles className="size-6 text-muted-foreground" /></div>
        {recentMaterials.length ? <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{recentMaterials.map((material) => <MaterialCard key={material.href} title={material.title} href={material.href} description={material.description} sectionTitle={material.sectionTitle} typeLabel={material.typeLabel} estimatedMinutes={material.estimatedMinutes} dateLabel={formatWhatsNewDate(material.updatedAt ?? material.createdAt)} badge={material.isNew ? "Новый" : "Обновлено"} />)}</div> : <p className="mt-6 rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">История изменений недоступна в этой сборке. Все опубликованные материалы остаются доступны в каталоге.</p>}
      </section>

      <section className="mt-16 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-border/70 bg-card/65 p-6 sm:p-8"><p className="inline-flex items-center gap-2 text-sm font-medium text-primary"><Search className="size-4" />Поиск и StackMIREA Ask</p><h2 className="mt-3 text-2xl font-semibold tracking-tight">Ищите страницу или задайте вопрос</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Глобальный поиск быстро находит конкретную тему. Ask помогает сформулировать запрос естественным языком и показывает подходящие фрагменты материалов.</p><div className="mt-6 flex flex-wrap gap-3"><SearchLauncher className={buttonVariants()}>Открыть поиск</SearchLauncher><Link href="/ask" className={buttonVariants({ variant: "outline" })}>Как работает Ask</Link></div></article>
        <article className="rounded-3xl border border-border/70 bg-card/65 p-6 sm:p-8"><p className="inline-flex items-center gap-2 text-sm font-medium text-primary"><GitPullRequest className="size-4" />Есть материал?</p><h2 className="mt-3 text-2xl font-semibold tracking-tight">Помогите StackMIREA стать полезнее</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Добавьте практику, исправьте неточность или предложите новое направление. На отдельной странице собраны точные шаги и команды проекта.</p><Link href="/contribute" className={cn(buttonVariants({ variant: "outline" }), "mt-6")}>Добавить материал <ArrowRight className="size-4" /></Link></article>
      </section>

      <section className="mt-5 flex flex-col gap-5 rounded-3xl border border-border/70 bg-foreground p-6 text-background sm:flex-row sm:items-center sm:justify-between sm:p-8"><div><p className="inline-flex items-center gap-2 text-sm font-medium text-background/70"><Github className="size-4" />Открытый проект</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Код, материалы и развитие — на GitHub</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-background/70">Изучайте архитектуру, открывайте issues и отправляйте Pull Request.</p></div><Link href={REPO_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-background px-5 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background">Открыть GitHub <ArrowRight className="size-4" /></Link></section>
    </div>
  );
}
