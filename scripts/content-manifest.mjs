import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { toString } from "mdast-util-to-string";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export const projectRoot = process.cwd();
export const docsRoot = path.join(projectRoot, "docs");
export const cacheRoot = path.join(projectRoot, ".cache");
export const manifestPath = path.join(cacheRoot, "content-manifest.json");

const TOPICS_PATH = path.join(projectRoot, "lib", "search-topics.json");
const TRACKS_PATH = path.join(projectRoot, "lib", "tracks.json");
const DEFAULT_DOC_AUTHOR = "minkinad";

const topicDefinitions = JSON.parse(fs.readFileSync(TOPICS_PATH, "utf8"));
const trackDefinitions = JSON.parse(fs.readFileSync(TRACKS_PATH, "utf8"));
const trackTitles = new Map(trackDefinitions.map((track) => [track.id, track.title]));

const SECTION_INDEX = {
  java: {
    virtualPath: "java/index.mdx",
    body: `---
title: Java
description: 24 Java-практики с решениями в формате задания и разбора.
order: 1
---

## Что внутри

- 24 практики по Java
- OOP, интерфейсы, очереди, GUI, MVC, паттерны
- Задание, решение и описание для каждой практики
`
  },
  python: {
    virtualPath: "python/index.mdx",
    body: `---
title: Python
description: Практические работы по Python в формате MDX-документации.
order: 1
---

## Что внутри

- Практика 4: OOP и AST
- Практика 5: тестирование и валидация
- Практика 6 и 6.2: комбинаторы и функциональный стиль
- Полный перенос тетрадей в \`docs/python\`
`
  },
  ai: {
    virtualPath: "ai/index.mdx",
    body: `---
title: AI
description: Рабочие тетради по искусственному интеллекту в формате MDX.
order: 1
---

# AI - обзор

Раздел объединяет 8 рабочих тетрадей по дисциплине «Искусственный интеллект», перенесенных в MDX-формат. Материалы идут от базового Python и научных библиотек к классическим ML-методам, нейросетям, эволюционным алгоритмам и кластеризации.

## Что внутри

- Python, NumPy и pandas для подготовки данных
- Метрики расстояния, KNN и базовые техники классификации
- Регрессия и деревья решений
- Эволюционные методы, нейросети и кластеризация

## Ноутбуки

- [Notebook 1 — Основа Python](./notebook-01-python-basics)
- [Notebook 2 — NumPy и pandas](./notebook-02-numpy-pandas)
- [Notebook 3 — Метрики и KNN](./notebook-03-metrics-and-knn)
- [Notebook 4 — Регрессия](./notebook-04-regression)
- [Notebook 5 — Деревья решений](./notebook-05-decision-trees)
- [Notebook 6 — Генетические и эволюционные методы](./notebook-06-genetic-and-annealing)
- [Notebook 7 — Нейронные сети](./notebook-07-neural-networks)
- [Notebook 8 — Кластеризация](./notebook-08-clustering)
`
  },
  bigdata: {
    virtualPath: "bigdata/index.mdx",
    body: `---
title: BigData
description: Практики по анализу больших данных, ML, классификации и кластеризации.
order: 1
---

# BigData - обзор

В этом разделе собраны практические работы по дисциплине BigData в формате MDX. Материалы охватывают вводную часть, анализ данных, регрессию, прикладные кейсы со страховыми данными, классификацию, кластеризацию, ансамблевые методы и итоговую работу.

## Что внутри

- Ввод в BigData и организацию практических работ
- Анализ и подготовка данных
- Регрессионные задачи и работа с датасетами
- Классификация, кластеризация и ансамблевое обучение
- Итоговая практика с оформлением результата

## Практики

- [Практика 1. Введение в BigData](./practice-01-introduction)
- [Практика 2. Аналитика данных](./practice-02-data-analysis)
- [Практика 3. Регрессия и наборы данных](./practice-03-regression-and-datasets)
- [Практика 4. Анализ данных страхования](./practice-04-insurance-analysis)
- [Практика 5. Классификация](./practice-05-classification)
- [Практика 6. Кластеризация](./practice-06-clustering)
- [Практика 7. Ансамблевое обучение](./practice-07-ensemble-learning)
- [Практика 8. Итоговая работа](./practice-08-final-report)

## Ресурсы

Файлы с датасетами и дополнительными материалами лежат в папке:

- [resources/bigdata (GitHub)](https://github.com/MinAleDm/StackMIREA/tree/main/resources/bigdata)
`
  },
  algorithms: {
    virtualPath: "algorithms/index.mdx",
    body: `---
title: Algorithms
description: Вводные и вспомогательные материалы StackMIREA Docs.
order: 1
---

## Что внутри

- Введение и навигация по проекту
- MDX-структура и правила оформления
- Связь с Python и Java треками
`
  }
};

const ALGORITHMS_GETTING_STARTED = {
  virtualPath: "algorithms/getting-started.mdx",
  body: `---
title: Getting Started
description: How to navigate StackMIREA documentation.
order: 2
---

## Навигация

Используйте левый sidebar для перехода между разделами, а правый блок **On this page** для перехода по секциям текущего документа.

## Формат материалов

- теория
- код
- разбор
- важные замечания

## Дальше

Откройте разделы Python, AI и Java через главную страницу.
`
};

function normalizePosixPath(value) {
  return value.split(path.sep).join("/");
}

function normalizeSlug(virtualPath) {
  const withoutExtension = virtualPath.replace(/\.(md|mdx)$/i, "");
  const parts = withoutExtension.split("/");

  if (parts.at(-1) === "index") {
    return parts.slice(0, -1);
  }

  return parts;
}

function getSlugKey(slug) {
  return slug.join("/");
}

function toTitleCase(value) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getTrackTitle(trackId) {
  return trackTitles.get(trackId) ?? toTitleCase(trackId);
}

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

export function findTopics(value) {
  const normalized = normalizeSearchValue(value);

  return topicDefinitions
    .filter((topic) => topic.aliases.some((alias) => normalized.includes(normalizeSearchValue(alias))))
    .map((topic) => topic.id);
}

export function stripMarkdown(source) {
  return source
    .replace(/^import\s.+$/gm, " ")
    .replace(/^export\s.+$/gm, " ")
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```/g, " "))
    .replace(/~~~[\s\S]*?~~~/g, (block) => block.replace(/~~~/g, " "))
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, " $1 ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, " $1 ")
    .replace(/`([^`]+)`/g, " $1 ")
    .replace(/^:::(tip|warning|info|note)\s*$/gm, " ")
    .replace(/^:::\s*$/gm, " ")
    .replace(/^>\s?/gm, "")
    .replace(/[#*_~>-]/g, " ")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeHeading(rawHeading) {
  return rawHeading
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/#+$/g, "")
    .trim();
}

function extractHeadingData(markdown) {
  const tree = unified().use(remarkParse).use(remarkMdx).use(remarkGfm).use(remarkDirective).parse(markdown);
  const slugger = new GithubSlugger();
  const anchors = [];
  const toc = [];

  visit(tree, "heading", (node) => {
    const title = normalizeHeading(toString(node));

    if (!title) {
      return;
    }

    const id = slugger.slug(title);
    anchors.push(id);

    if (node.depth === 2 || node.depth === 3) {
      toc.push({
        id,
        title,
        depth: node.depth
      });
    }
  });

  return {
    anchors,
    toc
  };
}

function toGitHubPerson(rawGitHub) {
  const trimmed = rawGitHub.trim();
  const githubUrlMatch = /github\.com\/([A-Za-z0-9-]+)/i.exec(trimmed);
  const withoutAt = trimmed.replace(/^@/, "");
  const github = githubUrlMatch?.[1] ?? withoutAt.split("/").filter(Boolean).at(-1) ?? withoutAt;

  return {
    github,
    profileUrl: `https://github.com/${github}`,
    avatarUrl: `https://github.com/${github}.png?size=120`
  };
}

function createHash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export class ContentRepository {
  constructor(rootDirectory = docsRoot) {
    this.rootDirectory = rootDirectory;
  }

  read() {
    const documents = [];

    if (!fs.existsSync(this.rootDirectory)) {
      return documents;
    }

    for (const filePath of this.#walkMarkdownFiles(this.rootDirectory)) {
      const relativePath = normalizePosixPath(path.relative(this.rootDirectory, filePath));
      const rawSource = fs.readFileSync(filePath, "utf8");
      const virtualPath =
        relativePath === "intro.md" || relativePath === "intro.mdx"
          ? "algorithms/getting-started.mdx"
          : relativePath.replace(/\.md$/i, ".mdx");

      documents.push({
        kind: "source",
        rawSource,
        sourcePath: `docs/${relativePath}`,
        editPath: relativePath,
        virtualPath
      });
    }

    return documents;
  }

  #walkMarkdownFiles(rootDirectory) {
    const files = [];
    const stack = [rootDirectory];

    while (stack.length > 0) {
      const currentDirectory = stack.pop();

      if (!currentDirectory || !fs.existsSync(currentDirectory)) {
        continue;
      }

      for (const entry of fs.readdirSync(currentDirectory, { withFileTypes: true })) {
        const fullPath = path.join(currentDirectory, entry.name);

        if (entry.isDirectory()) {
          stack.push(fullPath);
          continue;
        }

        if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
          files.push(fullPath);
        }
      }
    }

    return files.sort((left, right) => left.localeCompare(right));
  }
}

export class Parser {
  parse(document) {
    const parsed = matter(document.rawSource);
    const slug = normalizeSlug(document.virtualPath);
    const section = slug[0] ?? "docs";
    const isSectionIndex = slug.length === 1;
    const parsedOrder = Number(parsed.data.order ?? parsed.data.sidebar_position);
    const order = Number.isFinite(parsedOrder) ? parsedOrder : isSectionIndex ? 0 : 9999;
    const title = parsed.data.title?.toString().trim() || toTitleCase(slug.at(-1) ?? section);
    const description = parsed.data.description?.toString().trim() || "";
    const rawAuthor = parsed.data.author?.toString().trim() || DEFAULT_DOC_AUTHOR;
    const preview = stripMarkdown(parsed.content).slice(0, 260).trim();
    const { anchors, toc } = extractHeadingData(parsed.content);
    const topicSource = `${title} ${description} ${preview} ${stripMarkdown(parsed.content)}`;

    return {
      slug,
      slugKey: getSlugKey(slug),
      href: `/docs/${slug.join("/")}`,
      title,
      description,
      author: toGitHubPerson(rawAuthor),
      order,
      editPath: document.editPath,
      sourcePath: document.sourcePath,
      virtualPath: document.virtualPath,
      section,
      sectionTitle: getTrackTitle(section),
      body: parsed.content,
      toc,
      preview,
      topics: [...new Set(findTopics(topicSource))],
      anchors,
      hash: createHash(document.rawSource),
      isSectionIndex,
      isGenerated: document.kind === "generated"
    };
  }
}

export class ManifestBuilder {
  constructor(repository = new ContentRepository(), parser = new Parser()) {
    this.repository = repository;
    this.parser = parser;
  }

  build() {
    const documentsByVirtualPath = new Map();

    for (const document of this.repository.read()) {
      documentsByVirtualPath.set(document.virtualPath, document);
    }

    for (const config of [...Object.values(SECTION_INDEX), ALGORITHMS_GETTING_STARTED]) {
      if (!documentsByVirtualPath.has(config.virtualPath)) {
        documentsByVirtualPath.set(config.virtualPath, {
          kind: "generated",
          rawSource: config.body,
          sourcePath: null,
          editPath: null,
          virtualPath: config.virtualPath
        });
      }
    }

    const docs = [...documentsByVirtualPath.values()]
      .map((document) => this.parser.parse(document))
      .sort((left, right) => left.slugKey.localeCompare(right.slugKey));

    return {
      version: 1,
      generatedAt: new Date().toISOString(),
      sourceRoot: "docs",
      docs
    };
  }

  write(targetPath = manifestPath) {
    const manifest = this.build();
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
    return manifest;
  }
}

export function readContentManifest(sourcePath = manifestPath) {
  return JSON.parse(fs.readFileSync(sourcePath, "utf8"));
}

const executedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
const currentPath = fileURLToPath(import.meta.url);

if (executedPath === currentPath) {
  const manifest = new ManifestBuilder().write();
  console.log(`Content manifest generated at ${path.relative(projectRoot, manifestPath)} (${manifest.docs.length} docs)`);
}
