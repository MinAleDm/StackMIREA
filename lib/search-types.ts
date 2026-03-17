export interface SearchTopicDefinition {
  id: string;
  label: string;
  description: string;
  aliases: string[];
}

export interface SearchIndexChunk {
  id: string;
  heading: string;
  text: string;
  keywords: string[];
  topics: string[];
}

export interface SearchIndexDoc {
  id: string;
  href: string;
  slug: string[];
  section: string;
  sectionTitle: string;
  title: string;
  description: string;
  preview: string;
  keywords: string[];
  topics: string[];
  chunks: SearchIndexChunk[];
}

export interface SearchIndexPayload {
  version: number;
  generatedAt: string;
  docs: SearchIndexDoc[];
}

export interface SearchAnswerSummary {
  title: string;
  body: string;
  emphasisTopics: string[];
}

export interface SearchResult {
  doc: SearchIndexDoc;
  score: number;
  excerpt: string;
  heading: string;
  matchedTopics: string[];
  reasons: string[];
}
