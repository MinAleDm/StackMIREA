import trackDefinitions from "@/lib/tracks.json";
import { toTitleCase } from "@/lib/utils";

export type TrackIconKey =
  | "bot"
  | "brain"
  | "code2"
  | "database"
  | "gitPullRequest"
  | "listChecks"
  | "sigma";

export interface TrackDefinition {
  id: string;
  title: string;
  order: number;
  homeSubtitle: string;
  iconKey: TrackIconKey;
}

const tracks = trackDefinitions as TrackDefinition[];
const tracksById = new Map(tracks.map((track) => [track.id, track]));

export function getTrackDefinitions() {
  return tracks;
}

export function getTrackDefinition(trackId: string) {
  return tracksById.get(trackId) ?? null;
}

export function getTrackOrder(trackId: string) {
  return getTrackDefinition(trackId)?.order ?? 999;
}

export function getTrackTitle(trackId: string) {
  return getTrackDefinition(trackId)?.title ?? toTitleCase(trackId);
}
