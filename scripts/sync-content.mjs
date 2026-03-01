import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const docsRoot = path.join(projectRoot, "docs");
const contentRoot = path.join(projectRoot, "content");

const SECTION_INDEX = {
  java: {
    file: "index.mdx",
    body: `---\ntitle: Java\ndescription: Java track overview and tasks.\norder: 1\n---\n\n## Что внутри\n\n- 24 практики по Java\n- OOP, интерфейсы, MVC, паттерны проектирования\n- Структурированные примеры и разборы\n`
  },
  python: {
    file: "index.mdx",
    body: `---\ntitle: Python\ndescription: Python track overview and practices.\norder: 1\n---\n\n## Что внутри\n\n- Практики по OOP, автоматизации и regex\n- Примеры кода с разбором\n- Ссылки на исходники\n`
  },
  algorithms: {
    file: "index.mdx",
    body: `---\ntitle: Algorithms\ndescription: Algorithms track and supporting materials.\norder: 1\n---\n\n## Что внутри\n\n- Базовые алгоритмические концепции\n- ToC, навигация и примеры кода\n`
  }
};

const ALGORITHMS_GETTING_STARTED = `---
title: Getting Started
description: How to navigate this documentation platform.
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

Откройте разделы Python и Java через главную страницу.
`;

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function walk(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function writeFileIfChanged(filePath, content) {
  if (fs.existsSync(filePath)) {
    const current = fs.readFileSync(filePath, "utf-8");
    if (current === content) {
      return;
    }
  }

  fs.writeFileSync(filePath, content);
}

function writeFileIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
}

function main() {
  ensureDirectory(contentRoot);

  if (fs.existsSync(docsRoot)) {
    const sourceFiles = walk(docsRoot);

    for (const sourceFile of sourceFiles) {
      const relative = path.relative(docsRoot, sourceFile);
      const sourceContent = fs.readFileSync(sourceFile, "utf-8");
      let targetRelative;

      if (relative === "intro.md" || relative === "intro.mdx") {
        targetRelative = path.join("algorithms", "getting-started.mdx");
      } else {
        targetRelative = relative.replace(/\.md$/i, ".mdx");
      }

      const targetPath = path.join(contentRoot, targetRelative);
      ensureDirectory(path.dirname(targetPath));
      writeFileIfChanged(targetPath, sourceContent);
    }
  }

  for (const [section, config] of Object.entries(SECTION_INDEX)) {
    const sectionDir = path.join(contentRoot, section);
    ensureDirectory(sectionDir);
    writeFileIfChanged(path.join(sectionDir, config.file), config.body);
  }

  writeFileIfMissing(path.join(contentRoot, "algorithms", "getting-started.mdx"), ALGORITHMS_GETTING_STARTED);
}

main();
