import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const docsRoot = path.join(projectRoot, "docs");
const contentRoot = path.join(projectRoot, "content");

const SECTION_INDEX = {
  java: {
    file: "index.mdx",
    body: `---\ntitle: Java\ndescription: 24 Java-практики с решениями в формате задания и разбора.\norder: 1\n---\n\n## Что внутри\n\n- 24 практики по Java\n- OOP, интерфейсы, очереди, GUI, MVC, паттерны\n- Задание, решение и описание для каждой практики\n`
  },
  python: {
    file: "index.mdx",
    body: `---\ntitle: Python\ndescription: Практические работы по Python в формате MDX-документации.\norder: 1\n---\n\n## Что внутри\n\n- Практика 4: OOP и AST\n- Практика 5: тестирование и валидация\n- Практика 6 и 6.2: комбинаторы и функциональный стиль\n- Полный перенос тетрадей в \`docs/python\` и \`content/python\`\n`
  },
  ai: {
    file: "index.mdx",
    body: `---\ntitle: AI\ndescription: Рабочие тетради по искусственному интеллекту из Pr_Ai в формате MDX.\norder: 1\n---\n\n## Что внутри\n\n- Ноутбуки Notebook1..Notebook8\n- Теория, код и выводы из исходных тетрадей\n- Материалы по NumPy, pandas, ML, нейросетям и кластеризации\n`
  },
  // BigData is kept in SECTION_INDEX so content:sync always restores section landing page.
  bigdata: {
    file: "index.mdx",
    body: `---\ntitle: BigData\ndescription: Практики по анализу больших данных, ML, классификации и кластеризации.\norder: 1\n---\n\n## О разделе\n\nВ этом разделе собраны практические работы по дисциплине BigData в формате MDX.\n\n## Работы\n\n- [Практика 1. Введение в BigData](./practice-01-introduction)\n- [Практика 2. Аналитика данных](./practice-02-data-analysis)\n- [Практика 3. Регрессия и наборы данных](./practice-03-regression-and-datasets)\n- [Практика 4. Анализ данных страхования](./practice-04-insurance-analysis)\n- [Практика 5. Классификация](./practice-05-classification)\n- [Практика 6. Кластеризация](./practice-06-clustering)\n- [Практика 7. Ансамблевое обучение](./practice-07-ensemble-learning)\n- [Практика 8. Итоговая работа](./practice-08-final-report)\n\n## Ресурсы\n\nФайлы с датасетами перенесены в папку:\n\n- [resources/bigdata (GitHub)](https://github.com/MinAleDm/StackMIREA/tree/main/resources/bigdata)\n`
  },
  algorithms: {
    file: "index.mdx",
    body: `---\ntitle: Algorithms\ndescription: Вводные и вспомогательные материалы StackMIREA Docs.\norder: 1\n---\n\n## Что внутри\n\n- Введение и навигация по проекту\n- MDX-структура и правила оформления\n- Связь с Python и Java треками\n`
  }
};

const ALGORITHMS_GETTING_STARTED = `---
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
`;

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function clearMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      clearMarkdownFiles(fullPath);

      if (fs.readdirSync(fullPath).length === 0) {
        fs.rmdirSync(fullPath);
      }
      continue;
    }

    if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      fs.unlinkSync(fullPath);
    }
  }
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
  clearMarkdownFiles(contentRoot);

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
    writeFileIfMissing(path.join(sectionDir, config.file), config.body);
  }

  writeFileIfMissing(path.join(contentRoot, "algorithms", "getting-started.mdx"), ALGORITHMS_GETTING_STARTED);
}

main();
