const SEARCH_TERM_CHARACTER = /[\p{L}\p{N}#+]/u;

export function normalizeSearchValue(value) {
  return value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/c\+\+/g, "cpp")
    .replace(/c#/g, "csharp")
    .replace(/model-view-controller/g, "model view controller")
    .replace(/object-oriented/g, "object oriented")
    .replace(/k-nearest/g, "k nearest")
    .replace(/[^\p{L}\p{N}\s#+.-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function containsNormalizedPhrase(value, phrase) {
  if (!phrase) {
    return false;
  }

  let matchIndex = value.indexOf(phrase);

  while (matchIndex >= 0) {
    const previousCharacter = value[matchIndex - 1];
    const nextCharacter = value[matchIndex + phrase.length];
    const startsAtBoundary = !previousCharacter || !SEARCH_TERM_CHARACTER.test(previousCharacter);
    const endsAtBoundary = !nextCharacter || !SEARCH_TERM_CHARACTER.test(nextCharacter);

    if (startsAtBoundary && endsAtBoundary) {
      return true;
    }

    matchIndex = value.indexOf(phrase, matchIndex + phrase.length);
  }

  return false;
}

export function findMatchingTopicIds(value, topicDefinitions) {
  const normalizedValue = normalizeSearchValue(value);

  return topicDefinitions
    .filter((topic) =>
      topic.aliases.some((alias) => containsNormalizedPhrase(normalizedValue, normalizeSearchValue(alias)))
    )
    .map((topic) => topic.id);
}
