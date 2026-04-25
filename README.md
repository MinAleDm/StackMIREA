[![GitHub Pages Deploy](https://github.com/minkinad/StackMIREA/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/minkinad/StackMIREA/actions/workflows/deploy-gh-pages.yml)

# StackMIREA

StackMIREA - статическая документационная платформа для IT-дисциплин РТУ МИРЭА. Проект собирает учебные треки, практики, ноутбуки и методические материалы в единый интерфейс с документацией, семантическим поиском, блоком авторов на главной и публикацией через GitHub Pages.

Production URL: https://minkinad.github.io/StackMIREA/

## Актуальное состояние проекта

Актуально на 4 апреля 2026 года.

- 19 учебных треков в едином content manifest.
- 68 исходных Markdown/MDX-файлов в `docs/`.
- 71 Markdown/MDX-страница в `.cache/content-manifest.json`.
- 52 отдельных учебных материала без учёта индексных страниц разделов.
- Крупнейшие треки: `java` (26 страниц), `ai` (9), `bigdata` (9), `python` (6), `procedural-programming` (6).
- Два workflow в CI/CD: `PR Checks` и `Deploy Docs to GitHub Pages`.
- Добавлены community health файлы для GitHub: `CONTRIBUTING`, `CODE_OF_CONDUCT`, `SECURITY`, `SUPPORT`, issue templates и PR template.

## Что есть?

- Главная страница с семантическим поиском, блоком авторов и команд, правилами публикации и быстрыми переходами.
- Раздел документации `/docs` с карточками треков, sidebar, breadcrumbs, оглавлением страницы и пагинацией.
- Страница `/ask` с локальным семантическим поиском по `public/search-index.json`.
- MDX-рендеринг с подсветкой кода через Shiki и пользовательскими UI-компонентами.
- Ссылка `Редактировать источник` для перехода к редактированию материала в GitHub.
- Статическая публикация в GitHub Pages через GitHub Actions.

## Технологии

- Next.js 14 App Router
- React 18
- TypeScript 5
- Tailwind CSS
- `next-mdx-remote`, `remark-gfm`, `rehype-slug`
- Shiki

## Как устроен контент

- `docs/` - исходные материалы, которые редактируются вручную.
- `.cache/content-manifest.json` - единый build-time manifest, который используют приложение, поиск и валидатор.
- `resources/` - дополнительные файлы, датасеты и артефакты практик.
- `scripts/` - сборка content manifest, поискового индекса и валидация ссылок.
- `public/search-index.json` - локальный поисковый индекс для страницы `/ask`.

Основной pipeline:

1. Материалы редактируются в `docs/`.
2. `npm run content:manifest` собирает `.cache/content-manifest.json` с slug, frontmatter, author, toc, preview, topics и hash.
3. `npm run search:build` собирает поисковый индекс из manifest.
4. `npm run prepare:content` объединяет оба шага.
5. `npm run build` запускает `prepare:content` автоматически через `prebuild`.

## Учебные треки

- `algorithms`
- `ai`
- `bigdata`
- `business-process-modeling`
- `configuration-management`
- `data-structures-and-algorithms-part-1`
- `data-structures-and-algorithms-part-2`
- `database-development`
- `internet-of-things`
- `java`
- `object-oriented-programming`
- `procedural-programming`
- `project-management`
- `python`
- `react`
- `software-application-development-part-1`
- `software-testing-and-verification`
- `system-administration`
- `systems-analysis-and-conceptual-modeling-part-1`

## Быстрый старт

Требование: `Node.js >= 20`.

```bash
npm ci
npm run dev
```

Локальный dev-сервер будет доступен на `http://localhost:3000`.

## Скрипты

- `npm run dev` - локальная разработка; перед запуском автоматически выполняется `prepare:content`.
- `npm run build` - production build со статическим экспортом в `out/`.
- `npm run start` - локальный запуск собранной статической версии на `:3000`.
- `npm run lint` - проверка ESLint.
- `npm run typecheck` - проверка TypeScript.
- `npm run prepare:content` - сборка content manifest и поискового индекса.
- `npm run content:manifest` - генерация `.cache/content-manifest.json` из `docs/`.
- `npm run content:sync` - compatibility alias для `content:manifest`.
- `npm run search:build` - генерация `public/search-index.json`.
- `npm run validate:content` - проверка markdown-ссылок, якорей и репозиторных ссылок в code fence.
- `npm run export` - информационный скрипт: static export выполняется внутри `next build`.

## Структура проекта

```text
app/
components/
docs/
lib/
public/
resources/
scripts/
styles/
.github/workflows/
.github/ISSUE_TEMPLATE/
CODE_OF_CONDUCT.md
CONTRIBUTING.md
SECURITY.md
SUPPORT.md
```

## CI/CD и деплой

- [`.github/workflows/pr-check.yml`](./.github/workflows/pr-check.yml) проверяет `prepare:content`, `validate:content`, `lint`, `typecheck` и `build` для Pull Request.
- [`.github/workflows/deploy-gh-pages.yml`](./.github/workflows/deploy-gh-pages.yml) публикует сайт в GitHub Pages при пуше в `main` и при ручном запуске.
- В `Settings -> Pages` должен быть выбран `Source: GitHub Actions`.

## Community и вклад в проект

- [CONTRIBUTING.md](./CONTRIBUTING.md) - как правильно вносить изменения.
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) - правила поведения в проекте.
- [SECURITY.md](./SECURITY.md) - как безопасно сообщать об уязвимостях.
- [SUPPORT.md](./SUPPORT.md) - как запросить помощь и куда писать.
- [`.github/ISSUE_TEMPLATE/`](./.github/ISSUE_TEMPLATE/) - шаблоны для bug report, feature request и content update.
- [`.github/pull_request_template.md`](./.github/pull_request_template.md) - шаблон описания pull request.

## Как вносить изменения

1. Добавьте или обновите материал в `docs/<track>/...`.
2. Запустите `npm run content:manifest` или сразу `npm run prepare:content`.
3. Проверьте контент командой `npm run validate:content`.
4. Проверьте проект командами `npm run lint` и `npm run typecheck`.
5. Откройте Pull Request.

Для автора материала можно указать поле `author` во frontmatter: GitHub login или ссылку на профиль.

Для более подробного процесса контрибуции см. [CONTRIBUTING.md](./CONTRIBUTING.md).

## Лицензии

- Код проекта распространяется по лицензии MIT. См. [LICENSE](./LICENSE).
- Контент сайта, статьи и учебные материалы - CC BY-NC-SA 4.0. См. [CC-BY-NC-SA-4.0](./CC-BY-NC-SA-4.0).
