import type { Metadata } from "next";

import { GitHubUserBadge } from "@/components/ui/GitHubUserBadge";
import { getDevTeamMembers } from "@/lib/authors";
import { getAllDocs } from "@/lib/navigation";
import { getTrackTitle } from "@/lib/tracks";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Авторы",
  description: "Список авторов публикаций и участников команды разработки StackMIREA."
};

interface AuthorWithSummary {
  github: string;
  profileUrl: string;
  avatarUrl: string;
  docsCount: number;
  summary: string;
}

function formatSectionName(section: string) {
  return getTrackTitle(section.toLowerCase());
}

function buildSummary(sectionStats: Array<{ section: string; count: number }>) {
  const topSections = sectionStats.slice(0, 4);
  const topSectionSummary = topSections.map((stat) => `${formatSectionName(stat.section)} (${stat.count})`);

  if (topSectionSummary.length === 0) {
    return "Пока нет опубликованных материалов.";
  }

  if (topSectionSummary.length === 1) {
    return `Внес значимые изменения в ${topSectionSummary[0]}.`;
  }

  const lastSection = topSectionSummary.at(-1);
  const firstSections = topSectionSummary.slice(0, -1).join(", ");
  const suffix = sectionStats.length > topSections.length ? " и другие направления" : "";

  return `Внес значимые изменения в ${firstSections} и ${lastSection}${suffix}.`;
}

function getAuthorsWithSummary() {
  const docs = getAllDocs().filter((doc) => !doc.isSectionIndex);
  const authorsMap = new Map<
    string,
    {
      github: string;
      profileUrl: string;
      avatarUrl: string;
      docsCount: number;
      sections: Map<string, number>;
    }
  >();

  for (const doc of docs) {
    const key = doc.author.github.toLowerCase();
    const existing = authorsMap.get(key);
    const currentSectionCount = existing?.sections.get(doc.section) ?? 0;

    if (existing) {
      existing.docsCount += 1;
      existing.sections.set(doc.section, currentSectionCount + 1);
      continue;
    }

    authorsMap.set(key, {
      ...doc.author,
      docsCount: 1,
      sections: new Map([[doc.section, 1]])
    });
  }

  return [...authorsMap.values()]
    .map<AuthorWithSummary>((author) => {
      const sectionStats = [...author.sections.entries()]
        .map(([section, count]) => ({ section, count }))
        .sort((left, right) => {
          if (left.count !== right.count) {
            return right.count - left.count;
          }
          return left.section.localeCompare(right.section);
        });

      return {
        github: author.github,
        profileUrl: author.profileUrl,
        avatarUrl: author.avatarUrl,
        docsCount: author.docsCount,
        summary: buildSummary(sectionStats)
      };
    })
    .sort((left, right) => {
      if (left.docsCount !== right.docsCount) {
        return right.docsCount - left.docsCount;
      }
      return left.github.localeCompare(right.github);
    });
}

export default function AuthorsPage() {
  const authors = getAuthorsWithSummary();
  const devTeam = getDevTeamMembers();

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Авторы</h1>
        <p className="mt-3 max-w-3xl text-base text-muted-foreground">
          Здесь собраны все, кто публиковал материалы на сайте, и отдельный список участников команды разработки.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Авторы публикаций</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {authors.map((author) => (
            <article key={author.github} className="rounded-xl border border-border/80 bg-card/70 p-4">
              <GitHubUserBadge person={author} description={`Публикаций: ${author.docsCount}`} />
              <p className="mt-3 text-sm text-muted-foreground">{author.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Команда разработки</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {devTeam.map((member) => (
            <GitHubUserBadge key={member.github} person={member} description={member.role} />
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-border/80 bg-card/70 p-5">
        <h2 className="text-xl font-semibold tracking-tight">Контакты команды</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Для связи с командой разработки:{" "}
          <a href="mailto:petrushenko184@mail.ru" className="text-primary transition-opacity hover:opacity-80">
            petrushenko184@mail.ru
          </a>
          .
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Чтобы письмо обработали быстрее, укажите в теме: <span className="text-foreground">StackMIREA — ваш вопрос</span>.
        </p>
      </section>
    </div>
  );
}
