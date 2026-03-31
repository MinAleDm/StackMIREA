import Link from "next/link";
import { ArrowRight, BookMarked, FolderPlus, Sparkles, Users } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatWhatsNewDate, getWhatsNewOverview } from "@/lib/whats-new";

export function WhatsNewSection() {
  const { authors, hasGitHistory, materials, tracks } = getWhatsNewOverview();

  return (
    <section className="mt-10 rounded-3xl border border-border/70 bg-card/70 p-6 sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3.5" />
            Что нового в StackMIREA
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Последние обновления docs</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Показываем свежие изменения по материалам, трекам и авторам.
          </p>
        </div>

        <Link href="/docs" className={cn(buttonVariants({ variant: "outline" }), "rounded-2xl border-border/80 bg-background/70")}>
          Смотреть все материалы
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {!hasGitHistory ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border/80 bg-background/40 p-5 text-sm text-muted-foreground">
          История коммитов недоступна в этой сборке, поэтому блок временно не может показать свежие изменения.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          <section className="rounded-2xl border border-border/70 bg-background/55 p-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground">
              <BookMarked className="size-3.5" />
              Материалы
            </div>
            <div className="mt-4 space-y-3">
              {materials.length > 0 ? (
                materials.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-2xl border border-border/70 bg-card/70 p-4 transition-colors hover:border-primary/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-border/70 bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
                        {item.sectionTitle}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px]",
                          item.isNew ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        )}
                      >
                        {item.isNew ? "Новый" : "Обновлено"}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-6 text-foreground">{item.title}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{formatWhatsNewDate(item.updatedAt ?? item.createdAt)}</p>
                  </Link>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-border/80 bg-card/60 p-4 text-sm text-muted-foreground">
                  Пока не удалось определить последние изменения по материалам.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-border/70 bg-background/55 p-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground">
              <FolderPlus className="size-3.5" />
              Новые треки
            </div>
            <div className="mt-4 space-y-3">
              {tracks.length > 0 ? (
                tracks.map((track) => (
                  <Link
                    key={track.id}
                    href={track.href}
                    className="block rounded-2xl border border-border/70 bg-card/70 p-4 transition-colors hover:border-primary/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold leading-6 text-foreground">{track.title}</p>
                      <span className="rounded-full border border-border/70 bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
                        {track.itemsCount} материалов
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Добавлен {formatWhatsNewDate(track.introducedAt)}</p>
                  </Link>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-border/80 bg-card/60 p-4 text-sm text-muted-foreground">
                  История появления треков пока недоступна.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-border/70 bg-background/55 p-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground">
              <Users className="size-3.5" />
              Новые авторы
            </div>
            <div className="mt-4 space-y-3">
              {authors.length > 0 ? (
                authors.map((author) => (
                  <Link
                    key={author.github}
                    href={author.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/70 p-4 transition-colors hover:border-primary/40"
                  >
                    <img
                      src={author.avatarUrl}
                      alt={`Аватар ${author.github}`}
                      width={44}
                      height={44}
                      loading="lazy"
                      className="size-11 rounded-full border border-border/70 bg-muted object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-foreground">@{author.github}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {author.docsCount} публикаций, первая от {formatWhatsNewDate(author.firstContributionAt)}
                      </span>
                    </span>
                  </Link>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-border/80 bg-card/60 p-4 text-sm text-muted-foreground">
                  Пока не удалось собрать историю появления авторов.
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
