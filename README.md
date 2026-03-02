[![Deploy to GitHub Pages](https://github.com/MinAleDm/StackMIREA/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/MinAleDm/StackMIREA/actions/workflows/deploy-gh-pages.yml)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)

# StackMIREA

StackMIREA — это интерактивная образовательная платформа и цифровая методичка для студентов IT-направления МИРЭА. Проект собирает практические задания, готовые решения, теорию и разборы задач в единой, удобной для изучения структуре.

## Features
- Документация в формате MDX с поддержкой кода и callout-блоков.
- Отдельные треки: `python`, `ai`, `java`, `algorithms`.
- Автогенерация sidebar и навигации по структуре файлов.
- Подсветка кода (Shiki) + кнопка копирования.
- Статическая сборка и деплой на GitHub Pages.

## Tech Stack
- Next.js (App Router, static export)
- TypeScript
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

## Scripts
- `npm run dev` — локальная разработка
- `npm run content:sync` — синхронизация `docs/` -> `content/`
- `npm run build` — production build + static export в `out/`
- `npm run lint` — lint
- `npm run typecheck` — проверка TypeScript

## Project Structure
```text
app/
components/
content/
  ai/
  python/
  java/
  algorithms/
docs/
lib/
styles/
scripts/
.github/workflows/
```

## Deployment (GitHub Pages)
Деплой выполняется автоматически через GitHub Actions workflow:
- `.github/workflows/deploy-gh-pages.yml`

Требование для репозитория:
1. `Settings` -> `Pages`
2. `Build and deployment` -> `Source: GitHub Actions`

После пуша в `main` сайт публикуется автоматически.

## Contributing
Issue и PR приветствуются. Для крупных изменений лучше сначала открыть issue с описанием идеи.

## License
MIT — see [LICENSE](./LICENSE).
