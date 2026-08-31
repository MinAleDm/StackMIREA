import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import {
  containsNormalizedPhrase,
  findMatchingTopicIds,
  normalizeSearchValue
} from "../../../lib/search-normalization.mjs";

const topicDefinitions = JSON.parse(
  fs.readFileSync(new URL("../../../lib/search-topics.json", import.meta.url), "utf8")
);

test("containsNormalizedPhrase respects word boundaries", () => {
  assert.equal(containsNormalizedPhrase("machine learning", "machine learning"), true);
  assert.equal(containsNormalizedPhrase("html basics", "ml"), false);
  assert.equal(containsNormalizedPhrase("training pipeline", "ai"), false);
});

test("findMatchingTopicIds recognizes aliases without partial-word matches", () => {
  assert.ok(findMatchingTopicIds("Практика по ML", topicDefinitions).includes("ai"));
  assert.ok(!findMatchingTopicIds("HTML basics", topicDefinitions).includes("ai"));
});

test("normalizeSearchValue keeps technology aliases consistent", () => {
  assert.equal(normalizeSearchValue("C++ / C#"), "cpp csharp");
});
