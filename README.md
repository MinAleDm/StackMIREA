[![Deploy Docs to GitHub Pages](https://github.com/minkinad/StackMIREA/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/minkinad/StackMIREA/actions/workflows/deploy-gh-pages.yml)
[![Node.js >= 20](https://img.shields.io/badge/Node.js-%3E%3D20-000000?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

# StackMIREA

StackMIREA - статическая образовательная docs-платформа для IT-дисциплин МИРЭА. Проект объединяет учебные треки, практики, ноутбуки и методические материалы в единый интерфейс с навигацией, поиском, страницами авторов и публикацией через GitHub Pages.

## Что сейчас есть в проекте

- 19 учебных треков в единой структуре.
- 72 MD/MDX-страницы в `content/`.
- 53 отдельных учебных материала помимо индексных страниц.
- Крупнейшие треки: `java` (26 страниц), `ai` (10), `bigdata` (9), `python` (6).
- Статическая публикация на GitHub Pages через GitHub Actions.

## Ключевые возможности

- Docs-интерфейс на Next.js App Router со статическим экспортом в production.
- Автосборка навигации, sidebar, breadcrumbs и пагинации по структуре `content/`.
- Рендеринг MDX-материалов с поддержкой callout-блоков и подсветкой кода через Shiki.
- Страница `Спроси StackMIREA` с локальным семантическим поиском по build-time индексу.
- Страница авторов с агрегированием публикаций по разделам.
- Ссылки `Edit on GitHub` для быстрого перехода к редактированию материалов.
- Разделение между исходным слоем `docs/` и runtime-слоем `content/`.

## Технологии

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- MDX через `next-mdx-remote`, `remark-gfm`, `rehype-slug`
- Shiki для подсветки кода

## Структура контента

- `docs/` - исходные материалы, которые редактируются вручную.
- `content/` - синхронизированный слой, который использует приложение.
- `npm run content:sync` - переносит материалы из `docs/` в `content/`.
- `npm run search:build` - собирает `public/search-index.json` для страницы поиска.
- `npm run prepare:content` - выполняет синхронизацию и сборку поискового индекса.
- `npm run build` автоматически запускает `prepare:content` через `prebuild`.
- `npm run dev` автоматически запускает `prepare:content` через `predev`.

## Учебные треки

- `python`
- `ai`
- `bigdata`
- `java`
- `algorithms`
- `procedural-programming`
- `object-oriented-programming`
- `data-structures-and-algorithms-part-1`
- `react`
- `data-structures-and-algorithms-part-2`
- `configuration-management`
- `systems-analysis-and-conceptual-modeling-part-1`
- `software-application-development-part-1`
- `internet-of-things`
- `business-process-modeling`
- `database-development`
- `software-testing-and-verification`
- `system-administration`
- `project-management`

## Быстрый старт

Требование: `Node.js >= 20`.

```bash
npm ci
npm run dev
```

Локально проект будет доступен на `http://localhost:3000`.

## Скрипты

- `npm run dev` - локальная разработка.
- `npm run build` - production build со статическим экспортом в `out/`.
- `npm run start` - локальный запуск собранной статической версии на `:3000`.
- `npm run lint` - проверка ESLint.
- `npm run typecheck` - проверка TypeScript.
- `npm run prepare:content` - синхронизация контента и сборка поискового индекса.
- `npm run content:sync` - синхронизация `docs/` -> `content/`.
- `npm run search:build` - генерация локального поискового индекса.
- `npm run validate:content` - проверка внутренних markdown-ссылок, якорей и репозиторных ссылок в code fence.
- `npm run export` - информационный скрипт о static export.

## Структура проекта

```text
app/
components/
content/
docs/
lib/
public/
resources/
scripts/
styles/
.github/workflows/
```

Ключевые директории:

- `app/` - маршруты и страницы приложения.
- `components/` - layout и UI-компоненты.
- `docs/` - редактируемые исходные материалы.
- `content/` - контент, который читает приложение во время сборки и рантайма.
- `resources/` - дополнительные файлы, датасеты и артефакты практик.
- `scripts/` - служебные скрипты синхронизации и индексации.

## Деплой

Сайт публикуется в GitHub Pages workflow [`deploy-gh-pages.yml`](./.github/workflows/deploy-gh-pages.yml).

Что нужно в репозитории:

1. В `Settings -> Pages` выбрать `Source: GitHub Actions`.
2. Пушить изменения в ветку `main` или запускать workflow вручную.

Production URL: `https://minkinad.github.io/StackMIREA/`

## Как вносить изменения

1. Добавьте или обновите материал в `docs/<track>/...`.
2. Запустите `npm run content:sync`.
3. Проверьте контент командой `npm run validate:content`.
4. Проверьте проект командами `npm run lint` и `npm run typecheck`.
5. Откройте Pull Request.

Для автора материала можно указать поле `author` во frontmatter: GitHub login или ссылку на профиль.

## Лицензии

- Код проекта распространяется по лицензии MIT. См. [LICENSE](./LICENSE).
- Контент сайта, статьи и учебные материалы распространяются по лицензии CC BY-NC-SA 4.0. См. [CC-BY-NC-SA-4.0](./CC-BY-NC-SA-4.0).
