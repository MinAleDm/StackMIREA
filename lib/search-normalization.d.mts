interface SearchTopicLike {
  id: string;
  aliases: string[];
}

export function normalizeSearchValue(value: string): string;
export function containsNormalizedPhrase(value: string, phrase: string): boolean;
export function findMatchingTopicIds(value: string, topicDefinitions: SearchTopicLike[]): string[];
