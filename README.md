[![Deploy to GitHub Pages](https://github.com/MinAleDm/StackMIREA/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/MinAleDm/StackMIREA/actions/workflows/deploy-gh-pages.yml)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)

# StackMIREA

StackMIREA - образовательная платформа и документационный хаб для IT-дисциплин МИРЭА. Проект вырос из набора треков Python/AI/Java в полноценную многораздельную docs-платформу с единым UX, статическим деплоем и поддержкой авторства материалов.

## Масштаб проекта (март 2026)
- 19 учебных треков в едином формате.
- 67 страниц MD/MDX в `content/` (включая разделы-индексы).
- 48 учебных материалов помимо индексных страниц.
- Крупные треки: `java` (26 страниц), `ai` (10), `bigdata` (9), `python` (6).

## Ключевые возможности
- Единый docs-интерфейс на Next.js App Router.
- Автосборка навигации и sidebar по структуре `content/`.
- TOC, breadcrumbs и пагинация между материалами.
- Подсветка кода через Shiki и клиентская кнопка копирования.
- Семантический поиск `Спроси StackMIREA` по build-time индексу из `content/`.
- Страница авторов с агрегацией публикаций по разделам.
- Ссылка `Edit on GitHub` на каждой странице.
- Статическая публикация на GitHub Pages через GitHub Actions.

## Треки
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

## Архитектура контента
- Исходные учебные материалы хранятся в `docs/`.
- Скрипт `npm run content:sync` синхронизирует `docs/` -> `content/`.
- Во время `npm run build` синхронизация запускается автоматически (`prebuild`).
- Навигация, карточки разделов и статические страницы строятся из `content/`.

## Tech Stack
- Next.js 14 (App Router, static export в production)
- React 18 + TypeScript
- Tailwind CSS
- MDX (`next-mdx-remote`, `remark-gfm`, `rehype-slug`)
- Shiki

## Live
- Production: `https://minaledm.github.io/StackMIREA/`

## Quick Start
```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Требование: `Node.js >= 20` (см. `engines` в `package.json`).

## Scripts
- `npm run dev` — локальная разработка
- `npm run build` — production build (в production режиме экспортирует статический сайт в `out/`)
- `npm run start` — локальный запуск собранного статического `out/` на `:3000`
- `npm run prepare:content` — синхронизация `docs/` и сборка поискового индекса
- `npm run content:sync` — синхронизация `docs/` -> `content/`
- `npm run search:build` — генерация `public/search-index.json` для страницы `Спроси StackMIREA`
- `npm run lint` — проверка ESLint
- `npm run typecheck` — проверка TypeScript
- `npm run export` — информационный скрипт (экспорт выполняется внутри `npm run build`)

## Project Structure
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
- `app/` - маршруты и страницы (главная, docs, authors).
- `components/` - layout и UI-компоненты.
- `docs/` - исходные материалы, которые редактируются вручную.
- `content/` - синхронизированный слой, используемый рантаймом/билдом.
- `resources/` - дополнительные датасеты и файлы для практик.
- `scripts/sync-content.mjs` - pipeline синхронизации контента.

## Deployment (GitHub Pages)
Деплой выполняется GitHub Actions workflow:
- `.github/workflows/deploy-gh-pages.yml`

Требования в репозитории:
1. `Settings` -> `Pages`
2. `Build and deployment` -> `Source: GitHub Actions`

После push в `main` публикуется обновленная статическая версия сайта.

## Contribution Flow
1. Добавьте или обновите материал в `docs/<track>/...`.
2. Запустите `npm run content:sync`.
3. Проверьте проект: `npm run lint` и `npm run typecheck`.
4. Откройте Pull Request.

Для отображения автора материала можно указать в frontmatter поле `author` (GitHub login или ссылка на профиль).

## Contributing
Issue и PR приветствуются. Для крупных изменений лучше сначала открыть issue с описанием идеи.

## License
- Код проекта: MIT - see [LICENSE](./LICENSE).
- Контент сайта (документация, статьи, учебные материалы): CC-BY-NC-SA-4.0 - see [CC-BY-NC-SA-4.0](./CC-BY-NC-SA-4.0).
