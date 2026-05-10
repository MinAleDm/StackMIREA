import { getAuthorsWithSummary } from "@/lib/contributors";
import { getPublishedDocs } from "@/lib/navigation";
import { getTrackDefinitions, type TrackIconKey } from "@/lib/tracks";
import { getWhatsNewOverview, type WhatsNewAuthor, type WhatsNewMaterial } from "@/lib/whats-new";

export interface HomeTrackCard {
  id: string;
  href: string;
  title: string;
  description: string;
  iconKey: TrackIconKey;
  itemsCount: number;
}

export interface HomePopularTrack {
  id: string;
  href: string;
  title: string;
  description: string;
  itemsCount: number;
}

export interface HomePageOverview {
  trackCards: HomeTrackCard[];
  popularTracks: HomePopularTrack[];
  recentMaterials: WhatsNewMaterial[];
  featuredAuthors: WhatsNewAuthor[];
}

function getPublishedDocsCountByTrack() {
  return getPublishedDocs().reduce(
    (counts, doc) => counts.set(doc.section, (counts.get(doc.section) ?? 0) + 1),
    new Map<string, number>()
  );
}

export function getHomePageOverview(): HomePageOverview {
  const countsByTrack = getPublishedDocsCountByTrack();
  const whatsNew = getWhatsNewOverview();
  const fallbackAuthors = getAuthorsWithSummary();

  const sortedTracks = getTrackDefinitions()
    .map((track) => ({
      id: track.id,
      href: `/docs/${track.id}`,
      title: track.title,
      description: track.homeSubtitle,
      iconKey: track.iconKey,
      itemsCount: countsByTrack.get(track.id) ?? 0
    }))
    .sort((left, right) => {
      if (left.itemsCount !== right.itemsCount) {
        return right.itemsCount - left.itemsCount;
      }

      return left.title.localeCompare(right.title);
    });

  return {
    trackCards: sortedTracks.slice(0, 10),
    popularTracks: sortedTracks.slice(0, 3),
    recentMaterials: whatsNew.materials.slice(0, 3),
    featuredAuthors:
      whatsNew.authors.slice(0, 3).length > 0
        ? whatsNew.authors.slice(0, 3)
        : fallbackAuthors.slice(0, 3).map((author) => ({
            github: author.github,
            profileUrl: author.profileUrl,
            avatarUrl: author.avatarUrl,
            docsCount: author.docsCount,
            firstContributionAt: null
          }))
  };
}
