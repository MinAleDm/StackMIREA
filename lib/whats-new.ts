import { execFileSync } from "node:child_process";

import type { GitHubPerson } from "@/lib/authors";
import { getAllDocs } from "@/lib/navigation";
import { getTrackDefinitions, getTrackTitle } from "@/lib/tracks";

export interface WhatsNewMaterial {
  title: string;
  href: string;
  sectionTitle: string;
  updatedAt: string | null;
  createdAt: string | null;
  isNew: boolean;
}

export interface WhatsNewTrack {
  id: string;
  title: string;
  href: string;
  itemsCount: number;
  introducedAt: string | null;
}

export interface WhatsNewAuthor extends GitHubPerson {
  docsCount: number;
  firstContributionAt: string | null;
}

export interface WhatsNewOverview {
  materials: WhatsNewMaterial[];
  tracks: WhatsNewTrack[];
  authors: WhatsNewAuthor[];
  hasGitHistory: boolean;
}

interface GitPathDates {
  createdAt: string | null;
  updatedAt: string | null;
}

const gitDatesCache = new Map<string, GitPathDates>();
const gitFirstAdditionCache = new Map<string, string | null>();
let cachedOverview: WhatsNewOverview | null = null;

function runGitCommand(args: string[]) {
  try {
    return execFileSync("git", args, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return "";
  }
}

function getFirstNonEmptyLine(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean) ?? null;
}

function getGitDatesForPath(relativePath: string): GitPathDates {
  const normalizedPath = relativePath.replace(/\\/g, "/");
  const cached = gitDatesCache.get(normalizedPath);

  if (cached) {
    return cached;
  }

  const updatedAt = getFirstNonEmptyLine(runGitCommand(["log", "-1", "--format=%cI", "--", normalizedPath]));
  const createdAt = getFirstNonEmptyLine(
    runGitCommand(["log", "--diff-filter=A", "--reverse", "--format=%cI", "--", normalizedPath])
  );
  const dates = {
    createdAt,
    updatedAt
  };

  gitDatesCache.set(normalizedPath, dates);
  return dates;
}

function getFirstAdditionForPath(relativePath: string) {
  const normalizedPath = relativePath.replace(/\\/g, "/");
  const cached = gitFirstAdditionCache.get(normalizedPath);

  if (cached !== undefined) {
    return cached;
  }

  const firstAddition = getFirstNonEmptyLine(
    runGitCommand(["log", "--diff-filter=A", "--reverse", "--format=%cI", "--", normalizedPath])
  );

  gitFirstAdditionCache.set(normalizedPath, firstAddition);
  return firstAddition;
}

function compareDateDesc(left: string | null, right: string | null) {
  const leftTime = left ? Date.parse(left) : Number.NEGATIVE_INFINITY;
  const rightTime = right ? Date.parse(right) : Number.NEGATIVE_INFINITY;

  return rightTime - leftTime;
}

function buildRecentMaterials(): WhatsNewMaterial[] {
  return getAllDocs()
    .filter((doc) => !doc.isSectionIndex && doc.editPath)
    .map((doc) => {
      const dates = getGitDatesForPath(`docs/${doc.editPath}`);
      const updatedAt = dates.updatedAt ?? dates.createdAt;
      const createdAt = dates.createdAt;

      return {
        title: doc.title,
        href: doc.href,
        sectionTitle: getTrackTitle(doc.section),
        updatedAt,
        createdAt,
        isNew: Boolean(createdAt && updatedAt && createdAt === updatedAt)
      };
    })
    .filter((item) => item.updatedAt || item.createdAt)
    .sort((left, right) => compareDateDesc(left.updatedAt ?? left.createdAt, right.updatedAt ?? right.createdAt))
    .slice(0, 4);
}

function buildRecentTracks(): WhatsNewTrack[] {
  const itemCountByTrack = getAllDocs()
    .filter((doc) => !doc.isSectionIndex)
    .reduce((counts, doc) => counts.set(doc.section, (counts.get(doc.section) ?? 0) + 1), new Map<string, number>());

  return getTrackDefinitions()
    .map((track) => ({
      id: track.id,
      title: track.title,
      href: `/docs/${track.id}`,
      itemsCount: itemCountByTrack.get(track.id) ?? 0,
      introducedAt: getFirstAdditionForPath(`docs/${track.id}`)
    }))
    .filter((track) => track.introducedAt)
    .sort((left, right) => compareDateDesc(left.introducedAt, right.introducedAt))
    .slice(0, 3);
}

function buildRecentAuthors(): WhatsNewAuthor[] {
  const authors = new Map<
    string,
    {
      person: GitHubPerson;
      docsCount: number;
      firstContributionAt: string | null;
    }
  >();

  for (const doc of getAllDocs()) {
    if (doc.isSectionIndex || !doc.editPath) {
      continue;
    }

    const createdAt = getGitDatesForPath(`docs/${doc.editPath}`).createdAt;
    const key = doc.author.github.toLowerCase();
    const current = authors.get(key);

    if (!current) {
      authors.set(key, {
        person: doc.author,
        docsCount: 1,
        firstContributionAt: createdAt
      });
      continue;
    }

    current.docsCount += 1;

    if (!current.firstContributionAt || (createdAt && Date.parse(createdAt) < Date.parse(current.firstContributionAt))) {
      current.firstContributionAt = createdAt;
    }
  }

  return [...authors.values()]
    .filter((author) => author.firstContributionAt)
    .map((author) => ({
      ...author.person,
      docsCount: author.docsCount,
      firstContributionAt: author.firstContributionAt
    }))
    .sort((left, right) => compareDateDesc(left.firstContributionAt, right.firstContributionAt))
    .slice(0, 4);
}

export function formatWhatsNewDate(value: string | null) {
  if (!value) {
    return "Дата недоступна";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Дата недоступна";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

export function getWhatsNewOverview(): WhatsNewOverview {
  if (cachedOverview) {
    return cachedOverview;
  }

  const materials = buildRecentMaterials();
  const tracks = buildRecentTracks();
  const authors = buildRecentAuthors();

  cachedOverview = {
    materials,
    tracks,
    authors,
    hasGitHistory: materials.length > 0 || tracks.length > 0 || authors.length > 0
  };

  return cachedOverview;
}
