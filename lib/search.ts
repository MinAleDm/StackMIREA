import searchTopics from "@/lib/search-topics.json";
import type { SearchAnswerSummary, SearchIndexChunk, SearchIndexDoc, SearchIndexPayload, SearchResult, SearchTopicDefinition } from "@/lib/search-types";

interface PreparedChunk extends SearchIndexChunk {
  normalizedHeading: string;
  normalizedText: string;
  normalizedKeywords: string;
}

interface PreparedDoc extends SearchIndexDoc {
  normalizedTitle: string;
  normalizedDescription: string;
  normalizedSection: string;
  normalizedPreview: string;
  normalizedKeywords: string;
  chunks: PreparedChunk[];
}

interface SearchContext {
  normalizedQuery: string;
  tokens: string[];
  phrases: string[];
  matchedTopics: SearchTopicDefinition[];
  compareIntent: boolean;
}

const topicDefinitions = searchTopics as SearchTopicDefinition[];
const topicById = new Map(topicDefinitions.map((topic) => [topic.id, topic]));
const stopWords = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
  "что",
  "это",
  "как",
  "для",
  "или",
  "про",
  "где",
  "мне",
  "надо",
  "есть",
  "все",
  "всё",
  "тема",
  "темы",
  "по",
  "из",
  "с",
  "у",
  "на",
  "и",
  "в",
  "во",
  "не",
  "но",
  "а",
  "к",
  "ко"
]);

export function normalizeSearchValue(value: string) {
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

export function tokenizeSearchValue(value: string) {
  return normalizeSearchValue(value)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function unique<T>(values: T[]) {
  return [...new Set(values)];
}

function getTopicAliasTokens(topic: SearchTopicDefinition) {
  return unique(topic.aliases.flatMap((alias) => tokenizeSearchValue(alias)));
}

function findMatchedTopics(query: string) {
  const normalizedQuery = normalizeSearchValue(query);

  return topicDefinitions.filter((topic) =>
    topic.aliases.some((alias) => normalizedQuery.includes(normalizeSearchValue(alias)))
  );
}

function buildSearchContext(query: string): SearchContext {
  const normalizedQuery = normalizeSearchValue(query);
  const matchedTopics = findMatchedTopics(query);
  const tokens = unique([
    ...tokenizeSearchValue(query),
    ...matchedTopics.flatMap(getTopicAliasTokens)
  ]);
  const phrases = unique([
    normalizedQuery,
    ...matchedTopics.flatMap((topic) => topic.aliases.map((alias) => normalizeSearchValue(alias)).filter((alias) => alias.length > 2))
  ]).filter((phrase) => phrase.length > 2);
  const compareIntent = /(сравн|разниц|отлич|compare|vs\b|versus)/i.test(query);

  return {
    normalizedQuery,
    tokens,
    phrases,
    matchedTopics,
    compareIntent
  };
}

function scoreByPhrases(haystack: string, phrases: string[], weight: number) {
  let score = 0;

  for (const phrase of phrases) {
    if (haystack.includes(phrase)) {
      score += weight + Math.min(phrase.length, 16);
    }
  }

  return score;
}

function scoreByTokens(haystack: string, tokens: string[], weight: number) {
  let score = 0;

  for (const token of tokens) {
    if (haystack.includes(token)) {
      score += weight;
    }
  }

  return score;
}

function scoreChunk(chunk: PreparedChunk, context: SearchContext) {
  let score = 0;

  score += scoreByPhrases(chunk.normalizedHeading, context.phrases, 18);
  score += scoreByPhrases(chunk.normalizedText, context.phrases, 14);
  score += scoreByTokens(chunk.normalizedHeading, context.tokens, 8);
  score += scoreByTokens(chunk.normalizedText, context.tokens, 4);
  score += scoreByTokens(chunk.normalizedKeywords, context.tokens, 6);

  const matchedTopics = context.matchedTopics.filter((topic) => chunk.topics.includes(topic.id));
  score += matchedTopics.length * 18;

  return {
    score,
    matchedTopics: matchedTopics.map((topic) => topic.id)
  };
}

function scoreDoc(doc: PreparedDoc, context: SearchContext) {
  let score = 0;

  score += scoreByPhrases(doc.normalizedTitle, context.phrases, 22);
  score += scoreByPhrases(doc.normalizedDescription, context.phrases, 16);
  score += scoreByPhrases(doc.normalizedPreview, context.phrases, 12);
  score += scoreByTokens(doc.normalizedTitle, context.tokens, 9);
  score += scoreByTokens(doc.normalizedDescription, context.tokens, 5);
  score += scoreByTokens(doc.normalizedSection, context.tokens, 4);
  score += scoreByTokens(doc.normalizedKeywords, context.tokens, 7);

  const matchedTopics = context.matchedTopics.filter((topic) => doc.topics.includes(topic.id));
  score += matchedTopics.length * 24;

  let bestChunk: PreparedChunk | null = null;
  let bestChunkScore = 0;
  let bestChunkMatchedTopics: string[] = [];

  for (const chunk of doc.chunks) {
    const chunkScore = scoreChunk(chunk, context);

    if (chunkScore.score > bestChunkScore) {
      bestChunk = chunk;
      bestChunkScore = chunkScore.score;
      bestChunkMatchedTopics = chunkScore.matchedTopics;
    }
  }

  const fullTitleMatch = context.tokens.length > 1 && context.tokens.every((token) => doc.normalizedTitle.includes(token));
  if (fullTitleMatch) {
    score += 18;
  }

  return {
    score: score + bestChunkScore,
    bestChunk,
    matchedTopics: unique([...matchedTopics.map((topic) => topic.id), ...bestChunkMatchedTopics])
  };
}

function trimExcerpt(text: string, query: string) {
  const normalizedText = normalizeSearchValue(text);
  const normalizedQuery = normalizeSearchValue(query);

  if (normalizedText.length <= 220) {
    return text;
  }

  const phraseIndex = normalizedText.indexOf(normalizedQuery);
  if (phraseIndex >= 0) {
    const start = Math.max(0, phraseIndex - 80);
    const end = Math.min(text.length, start + 220);
    const snippet = text.slice(start, end).trim();
    return `${start > 0 ? "..." : ""}${snippet}${end < text.length ? "..." : ""}`;
  }

  return `${text.slice(0, 220).trim()}...`;
}

function buildReasons(result: { doc: SearchIndexDoc; matchedTopics: string[]; heading: string }) {
  const reasons: string[] = [];

  if (result.matchedTopics.length > 0) {
    reasons.push(
      `Темы: ${result.matchedTopics
        .map((topicId) => topicById.get(topicId)?.label ?? topicId)
        .join(", ")}`
    );
  }

  if (result.heading) {
    reasons.push(`Раздел: ${result.heading}`);
  }

  reasons.push(`Трек: ${result.doc.sectionTitle}`);

  return reasons;
}

export function prepareSearchIndex(index: SearchIndexPayload) {
  const docs: PreparedDoc[] = index.docs.map((doc) => ({
    ...doc,
    normalizedTitle: normalizeSearchValue(doc.title),
    normalizedDescription: normalizeSearchValue(doc.description),
    normalizedSection: normalizeSearchValue(`${doc.section} ${doc.sectionTitle}`),
    normalizedPreview: normalizeSearchValue(doc.preview),
    normalizedKeywords: normalizeSearchValue(doc.keywords.join(" ")),
    chunks: doc.chunks.map((chunk) => ({
      ...chunk,
      normalizedHeading: normalizeSearchValue(chunk.heading),
      normalizedText: normalizeSearchValue(chunk.text),
      normalizedKeywords: normalizeSearchValue(chunk.keywords.join(" "))
    }))
  }));

  return {
    ...index,
    docs
  };
}

export function runSemanticSearch(index: ReturnType<typeof prepareSearchIndex>, query: string) {
  const context = buildSearchContext(query);

  if (!context.normalizedQuery) {
    return [];
  }

  const results: SearchResult[] = [];

  for (const doc of index.docs) {
    const scored = scoreDoc(doc, context);

    if (scored.score <= 0) {
      continue;
    }

    const excerptSource = scored.bestChunk?.text || doc.preview || doc.description;
    const heading = scored.bestChunk?.heading || "";
    const result: SearchResult = {
      doc,
      score: scored.score,
      excerpt: trimExcerpt(excerptSource, query),
      heading,
      matchedTopics: scored.matchedTopics,
      reasons: buildReasons({
        doc,
        matchedTopics: scored.matchedTopics,
        heading
      })
    };

    results.push(result);
  }

  return results.sort((left, right) => right.score - left.score).slice(0, 10);
}

export function buildAskSummary(query: string, results: SearchResult[]): SearchAnswerSummary {
  const context = buildSearchContext(query);

  if (results.length === 0) {
    return {
      title: "Ничего близкого не найдено",
      body: "Попробуй короче, по теме или по инструменту: например `KNN`, `pandas`, `MVC`, `SQL`, `регрессия`.",
      emphasisTopics: []
    };
  }

  if (context.compareIntent && context.matchedTopics.length >= 2) {
    const [leftTopic, rightTopic] = context.matchedTopics;
    const leftDocs = results.filter((result) => result.matchedTopics.includes(leftTopic.id)).slice(0, 2);
    const rightDocs = results.filter((result) => result.matchedTopics.includes(rightTopic.id)).slice(0, 2);

    return {
      title: `Сравнил ${leftTopic.label} и ${rightTopic.label}`,
      body:
        `${leftTopic.label} чаще встречается в ${unique(leftDocs.map((result) => result.doc.sectionTitle)).join(", ") || "материалах StackMIREA"}, ` +
        `а ${rightTopic.label} заметнее в ${unique(rightDocs.map((result) => result.doc.sectionTitle)).join(", ") || "других треках"}. ` +
        "Открой верхние результаты: они уже отсортированы так, чтобы рядом оказались материалы по обеим темам.",
      emphasisTopics: [leftTopic.id, rightTopic.id]
    };
  }

  if (context.matchedTopics.length > 0) {
    const [mainTopic] = context.matchedTopics;
    const sections = unique(
      results
        .filter((result) => result.matchedTopics.includes(mainTopic.id))
        .slice(0, 4)
        .map((result) => result.doc.sectionTitle)
    );

    return {
      title: `Нашёл материалы по теме ${mainTopic.label}`,
      body:
        `${mainTopic.label} лучше всего покрыт в ${sections.join(", ") || "нескольких треках"}. ` +
        "Сначала смотри результаты с совпавшими темами и конкретными фрагментами: именно они ближе всего к смыслу запроса.",
      emphasisTopics: [mainTopic.id]
    };
  }

  const topSections = unique(results.slice(0, 4).map((result) => result.doc.sectionTitle));

  return {
    title: "Собрал самые близкие материалы",
    body:
      `По запросу нашлись страницы в ${topSections.join(", ")}. ` +
      "Сверху идут результаты, где совпадают и название темы, и содержательные фрагменты внутри публикаций.",
    emphasisTopics: []
  };
}

export function getTopicDefinitions() {
  return topicDefinitions;
}

export function getSuggestedQueries() {
  return [
    "где в материалах есть про KNN",
    "покажи все практики с pandas",
    "сравни MVC и OOP темы",
    "что есть по SQL и базам данных",
    "найди материалы по регрессии",
    "где есть кластеризация"
  ];
}
