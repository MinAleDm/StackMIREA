import { contentLinksRule } from "./content-links.mjs";
import {
  duplicateSlugRule,
  emptySectionIndexRule,
  invalidAuthorRule,
  missingDescriptionRule,
  orphanPageRule,
  oversizedPageRule,
  oversizedSearchChunkRule,
  unusedResourceRule
} from "./content-health.mjs";

export const contentQualityRules = [
  missingDescriptionRule,
  duplicateSlugRule,
  invalidAuthorRule,
  contentLinksRule,
  oversizedPageRule,
  unusedResourceRule,
  orphanPageRule,
  emptySectionIndexRule,
  oversizedSearchChunkRule
];
