import assert from "node:assert/strict";
import test from "node:test";

import {
  buildAskSummary,
  collectRelatedTopicIds,
  normalizeSearchValue,
  prepareSearchIndex,
  runSemanticSearch,
  tokenizeSearchValue
} from "../search";
import type { SearchIndexDoc, SearchIndexPayload, SearchResult } from "../search-types";

function createDoc(overrides: Partial<SearchIndexDoc> = {}): SearchIndexDoc {
  return {
    id: "python/pandas",
    href: "/docs/python/pandas",
    slug: ["python", "pandas"],
    section: "python",
    sectionTitle: "Python",
    title: "Анализ данных с pandas",
    description: "Практика по работе с DataFrame.",
    preview: "Загрузка, очистка и группировка табличных данных.",
    keywords: ["python", "pandas", "dataframe"],
    topics: ["python", "pandas"],
    chunks: [
      {
        id: "chunk-0",
        heading: "Группировка данных",
        text: "DataFrame позволяет фильтровать строки и группировать результаты.",
        keywords: ["dataframe", "groupby"],
        topics: ["pandas"]
      }
    ],
    ...overrides
  };
}

function createIndex(docs: SearchIndexDoc[]): SearchIndexPayload {
  return {
    version: 1,
    generatedAt: "2026-01-01T00:00:00.000Z",
    docs
  };
}

test("normalizeSearchValue normalizes language and technology aliases", () => {
  assert.equal(normalizeSearchValue("  Ёлка, C++ и C#  "), "елка cpp и csharp");
});

test("tokenizeSearchValue removes short tokens and stop words", () => {
  assert.deepEqual(tokenizeSearchValue("Где есть материалы по pandas и SQL?"), ["материалы", "pandas", "sql"]);
});

test("runSemanticSearch ranks the most relevant document first", () => {
  const index = prepareSearchIndex(
    createIndex([
      createDoc(),
      createDoc({
        id: "java/collections",
        href: "/docs/java/collections",
        slug: ["java", "collections"],
        section: "java",
        sectionTitle: "Java",
        title: "Коллекции Java",
        description: "Списки и отображения в Java.",
        preview: "ArrayList, HashMap и итераторы.",
        keywords: ["java", "collections"],
        topics: ["java"],
        chunks: []
      })
    ])
  );

  const results = runSemanticSearch(index, "как использовать DataFrame в pandas");

  assert.equal(results[0]?.doc.id, "python/pandas");
  assert.match(results[0]?.excerpt ?? "", /DataFrame/);
  assert.ok(results[0]?.matchedTopics.includes("pandas"));
});

test("short topic aliases do not match inside unrelated words", () => {
  const index = prepareSearchIndex(
    createIndex([
      createDoc({
        id: "web/html",
        href: "/docs/web/html",
        slug: ["web", "html"],
        section: "web",
        sectionTitle: "Web",
        title: "HTML basics",
        description: "Markup language overview.",
        preview: "Elements and attributes.",
        keywords: ["html"],
        topics: ["ai"],
        chunks: []
      })
    ])
  );

  const [result] = runSemanticSearch(index, "HTML");

  assert.equal(result?.doc.id, "web/html");
  assert.deepEqual(result?.matchedTopics, []);
});

test("buildAskSummary describes comparisons between recognized topics", () => {
  const doc = createDoc();
  const results: SearchResult[] = [
    {
      doc,
      score: 100,
      excerpt: doc.preview,
      heading: "",
      matchedTopics: ["mvc", "oop"],
      reasons: []
    }
  ];

  const summary = buildAskSummary("сравни MVC и OOP", results);

  assert.equal(summary.title, "Сравнил MVC и OOP");
  assert.deepEqual(summary.emphasisTopics, ["mvc", "oop"]);
});

test("collectRelatedTopicIds preserves relevance order and applies the limit", () => {
  const doc = createDoc();
  const makeResult = (matchedTopics: string[]): SearchResult => ({
    doc,
    score: 1,
    excerpt: "",
    heading: "",
    matchedTopics,
    reasons: []
  });

  assert.deepEqual(
    collectRelatedTopicIds([makeResult(["python", "pandas"]), makeResult(["pandas", "sql"])], 2),
    ["python", "pandas"]
  );
});
