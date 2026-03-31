import { getDevTeamMembers, type GitHubPerson } from "@/lib/authors";
import { getAllDocs } from "@/lib/navigation";
import { getTrackTitle } from "@/lib/tracks";

export interface AuthorWithSummary extends GitHubPerson {
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

export function getAuthorsWithSummary() {
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

export function getContributorsOverview() {
  return {
    authors: getAuthorsWithSummary(),
    devTeam: getDevTeamMembers()
  };
}
