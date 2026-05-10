import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BookOpenText,
  BrainCircuit,
  Braces,
  Boxes,
  Coffee,
  Database,
  GitBranch,
  Network,
  Sigma,
  SquareTerminal
} from "lucide-react";

import { HomeSearchForm } from "@/components/home/HomeSearchForm";
import { getHomePageOverview } from "@/lib/home";
import type { TrackIconKey } from "@/lib/tracks";
import { cn } from "@/lib/utils";
import { formatWhatsNewDate } from "@/lib/whats-new";

export const dynamic = "force-static";

const displayTitleByTrackId: Record<string, string> = {
  algorithms: "Алгоритмы",
  ai: "AI",
  bigdata: "Большие данные",
  java: "Java",
  python: "Python",
  react: "React",
  "procedural-programming": "Процедурное программирование"
};

const accentByTrackId: Record<string, string> = {
  react: "#79A7FF",
  bigdata: "#6C95FF",
  java: "#7CA1FF",
  algorithms: "#89ABFF",
  ai: "#9E8BFF",
  python: "#7FBAFF",
  "procedural-programming": "#75A6FF"
};

const iconByTrackId: Partial<Record<string, typeof Atom>> = {
  react: Atom,
  bigdata: Database,
  java: Coffee,
  algorithms: Sigma,
  ai: BrainCircuit,
  python: Braces,
  "procedural-programming": SquareTerminal
};

const fallbackIconByKey: Record<TrackIconKey, typeof Atom> = {
  bot: BrainCircuit,
  brain: Boxes,
  code2: SquareTerminal,
  database: Database,
  gitPullRequest: GitBranch,
  listChecks: Network,
  sigma: Sigma
};

const changeToneByStatus = {
  new: "bg-[#dff7da] text-[#2f9557] dark:bg-emerald-500/15 dark:text-emerald-300",
  updated: "bg-[#e4edff] text-[#5f84e7] dark:bg-blue-500/15 dark:text-blue-300"
} as const;

function getHomeDisplayTitle(trackId: string, title: string) {
  return displayTitleByTrackId[trackId] ?? title;
}

function getTrackIcon(trackId: string, iconKey: TrackIconKey) {
  return iconByTrackId[trackId] ?? fallbackIconByKey[iconKey];
}

function getTrackAccent(trackId: string) {
  return accentByTrackId[trackId] ?? "#7C9FFF";
}

function getRecentChangeTone(isNew: boolean) {
  return isNew ? changeToneByStatus.new : changeToneByStatus.updated;
}

export default function HomePage() {
  const { trackCards, popularTracks, recentMaterials, featuredAuthors } = getHomePageOverview();

  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 pb-20 pt-8 sm:px-8 lg:px-10">
      <section className="relative overflow-hidden rounded-[18px] border border-[#d7e1f7] bg-white shadow-[0_18px_46px_rgba(126,154,214,0.12)] dark:border-white/10 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(250,252,255,0.98)_100%)] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.96)_0%,rgba(3,7,18,0.96)_100%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[40.2%] bg-[linear-gradient(90deg,rgba(237,243,255,0.96)_0%,rgba(151,189,255,0.92)_45%,rgba(188,211,255,0.84)_100%)] md:block" />
        <div className="absolute inset-y-0 right-0 hidden w-[40.2%] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.14)_0,rgba(255,255,255,0.14)_76px,rgba(255,255,255,0.34)_76px,rgba(255,255,255,0.34)_78px,rgba(255,255,255,0.10)_78px,rgba(255,255,255,0.10)_152px)] md:block" />
        <div className="absolute inset-x-0 bottom-0 h-[44%] bg-[linear-gradient(180deg,rgba(113,157,255,0)_0%,rgba(113,157,255,0.11)_100%)]" />
        <div className="absolute -left-16 bottom-[-18%] h-[62%] w-[36%] bg-[radial-gradient(circle_at_center,rgba(115,163,255,0.42)_0%,rgba(115,163,255,0.18)_38%,rgba(115,163,255,0)_74%)]" />
        <div className="absolute inset-y-0 left-0 w-full bg-[repeating-linear-gradient(90deg,rgba(125,164,255,0.03)_0,rgba(125,164,255,0.03)_118px,transparent_118px,transparent_238px)] opacity-80" />

        <div className="relative min-h-[320px] px-6 py-8 sm:px-8 sm:py-10 lg:min-h-[460px] lg:px-[72px] lg:py-[68px]">
          <div className="max-w-[860px]">
            <h1 className="max-w-[660px] text-balance text-[2.2rem] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[3rem] lg:text-[4rem] lg:leading-[1.04] dark:text-white">
              Практики и ноутбуки
              <br />
              в едином формате docs
            </h1>

            <p className="mt-6 max-w-[860px] text-pretty text-base leading-[1.45] text-slate-500 sm:text-[1.35rem] lg:mt-8 lg:text-[2rem] lg:leading-[1.34] dark:text-slate-300">
              Учебные материалы StackMIREA по ключевым IT-дисциплинам. Каждая страница оформлена как техническая
              документация с кодом, разбором и привязкой к исходникам.
            </p>
          </div>

          <div className="mt-7 flex justify-start md:justify-end lg:absolute lg:bottom-[46px] lg:right-[64px] lg:mt-0">
            <Link
              href="/docs"
              className="inline-flex h-12 items-center gap-2 rounded-[12px] bg-[#3575f6] px-6 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(53,117,246,0.22)] transition-colors hover:bg-[#2868ea]"
            >
              <BookOpenText className="size-4" />
              Открыть документацию
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-11">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {trackCards.map((track) => {
            const Icon = getTrackIcon(track.id, track.iconKey);
            const accentColor = getTrackAccent(track.id);

            return (
              <Link
                key={track.id}
                href={track.href}
                className="group relative flex min-h-[218px] flex-col overflow-hidden rounded-[18px] border border-[#d8e0ee] bg-white px-5 pb-5 pt-4 shadow-[0_10px_28px_rgba(113,133,178,0.10)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(113,133,178,0.16)] dark:border-white/10 dark:bg-slate-950"
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(125,164,255,0.08)_0%,rgba(255,255,255,0)_44%,rgba(125,164,255,0.05)_100%)]" />
                <div className="absolute inset-x-0 top-0 h-[56%] bg-[repeating-linear-gradient(90deg,rgba(120,162,255,0.06)_0,rgba(120,162,255,0.06)_16px,transparent_16px,transparent_34px)] opacity-75" />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="inline-flex size-7 items-center justify-center text-slate-950 dark:text-white">
                    <Icon className="size-3.5" />
                  </span>
                </div>

                <div className="relative mt-1 flex min-h-[112px] items-center justify-center">
                  <div
                    className="absolute inset-x-3 bottom-2 h-8 rounded-full blur-2xl"
                    style={{ backgroundColor: `${accentColor}4d` }}
                  />
                  <div
                    className="absolute inset-x-2 top-0 h-full rounded-[28px] opacity-90 blur-3xl"
                    style={{ background: `radial-gradient(circle, ${accentColor}26 0%, transparent 68%)` }}
                  />
                  <Icon
                    className="relative size-[82px] transition-transform duration-300 group-hover:scale-105"
                    strokeWidth={1.15}
                    style={{
                      color: accentColor,
                      filter: `drop-shadow(0 0 10px ${accentColor}66) drop-shadow(0 0 26px ${accentColor}28)`
                    }}
                  />
                </div>

                <div className="relative mt-4">
                  <h2 className="text-[1.1rem] font-semibold tracking-tight text-slate-950 dark:text-white">
                    {getHomeDisplayTitle(track.id, track.title)}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-[1.45] text-slate-500 dark:text-slate-300">{track.description}</p>
                </div>

                <span className="relative mt-auto inline-flex items-center justify-end gap-1 pt-5 text-[13px] font-medium text-[#4f7cf6]">
                  Открыть трек
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-11 overflow-hidden rounded-[20px] border border-[#d7e1f7] bg-[linear-gradient(90deg,rgba(121,167,255,0.24)_0%,rgba(255,255,255,0.98)_32%,rgba(129,175,255,0.32)_100%)] p-6 shadow-[0_18px_44px_rgba(126,154,214,0.10)] dark:border-white/10 dark:bg-[linear-gradient(90deg,rgba(64,99,190,0.25)_0%,rgba(2,6,23,0.94)_30%,rgba(64,99,190,0.32)_100%)] sm:p-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">ИИ-поиск по StackMIREA</h2>
          <p className="mt-3 text-lg leading-7 text-slate-500 dark:text-slate-300">
            Задайте вопрос своими словами, умный поиск найдёт ответ в коде и разборах.
          </p>

          <HomeSearchForm />
        </div>
      </section>

      <section className="mt-18">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">Что нового в сообществе</h2>
          <p className="mt-3 text-lg text-slate-500 dark:text-slate-300">Новые решения, популярные материалы и авторы сообщества</p>
        </div>

        <div className="mt-10 grid gap-4 xl:grid-cols-3">
          <article className="rounded-[18px] border border-[#d8e0ee] bg-white p-6 shadow-[0_10px_28px_rgba(113,133,178,0.10)] dark:border-white/10 dark:bg-slate-950">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Популярные</h3>
            <div className="mt-5 space-y-4">
              {popularTracks.map((track) => (
                <Link
                  key={track.id}
                  href={track.href}
                  className="block rounded-[16px] border border-[#d8e0ee] bg-white/90 p-4 transition-colors hover:border-[#b8caf9] dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                      {track.itemsCount} материалов
                    </span>
                    <span className="rounded-full bg-[#fff2be] px-2.5 py-1 text-[11px] text-[#c49300] dark:bg-amber-500/15 dark:text-amber-300">
                      {track.itemsCount}
                    </span>
                  </div>
                  <p className="mt-3 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">{getHomeDisplayTitle(track.id, track.title)}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500 dark:text-slate-300">{track.description}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-400 dark:text-slate-500">Материалы курса и раздела</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-[#4f7cf6]">
                      Просмотреть
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-[18px] border border-[#d8e0ee] bg-white p-6 shadow-[0_10px_28px_rgba(113,133,178,0.10)] dark:border-white/10 dark:bg-slate-950">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Изменения</h3>
            <div className="mt-5 space-y-4">
              {recentMaterials.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-[16px] border border-[#d8e0ee] bg-white/90 p-4 transition-colors hover:border-[#b8caf9] dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                      {item.sectionTitle}
                    </span>
                    <span className={cn("rounded-full px-2.5 py-1 text-[11px]", getRecentChangeTone(item.isNew))}>
                      {item.isNew ? "Новый" : "Обновлено"}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">{item.title}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500 dark:text-slate-300">
                    Последнее изменение {formatWhatsNewDate(item.updatedAt ?? item.createdAt)}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-400 dark:text-slate-500">{formatWhatsNewDate(item.updatedAt ?? item.createdAt)}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-[#4f7cf6]">
                      Просмотреть
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-[18px] border border-[#d8e0ee] bg-white p-6 shadow-[0_10px_28px_rgba(113,133,178,0.10)] dark:border-white/10 dark:bg-slate-950">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Авторы</h3>
            <div className="mt-5 space-y-4">
              {featuredAuthors.map((author) => (
                <Link
                  key={author.github}
                  href={author.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-[16px] border border-[#d8e0ee] bg-white/90 p-4 transition-colors hover:border-[#b8caf9] dark:border-white/10 dark:bg-white/5"
                >
                  <img
                    src={author.avatarUrl}
                    alt={`Аватар ${author.github}`}
                    width={52}
                    height={52}
                    loading="lazy"
                    className="size-12 rounded-full border border-white bg-slate-200 object-cover shadow-sm"
                  />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-950 dark:text-white">@{author.github}</span>
                    <span className="mt-1 block text-xs text-slate-400 dark:text-slate-500">
                      {author.firstContributionAt
                        ? `Первая публикация ${formatWhatsNewDate(author.firstContributionAt)}`
                        : `${author.docsCount} публикаций в проекте`}
                    </span>
                  </span>

                  <span className="inline-flex h-9 items-center rounded-[10px] bg-[#3575f6] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#2868ea]">
                    Просмотреть
                  </span>
                </Link>
              ))}

              {featuredAuthors.length === 0 ? (
                <div className="rounded-[16px] border border-dashed border-[#d8e0ee] p-4 text-sm text-slate-500 dark:border-white/10 dark:text-slate-300">
                  История авторов пока недоступна в этой сборке.
                </div>
              ) : null}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
