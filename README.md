# Practice Make Perfect Docs

Production-grade documentation platform on Next.js App Router with full static export for GitHub Pages.

## Stack

- Next.js (App Router, static export)
- TypeScript
- TailwindCSS
- shadcn/ui patterns
- MDX
- Shiki

## GitHub Pages Requirements

Project is configured for deployment to:

`https://MinAleDm.github.io/Practice-Make-Perfect/`

Key settings are in `next.config.mjs`:

- `output: "export"`
- `basePath: "/Practice-Make-Perfect"` (production)
- `assetPrefix: "/Practice-Make-Perfect/"` (production)
- `trailingSlash: true`
- `images.unoptimized: true`

## Project Structure

```text
app/
  layout.tsx
  page.tsx
  not-found.tsx
  robots.ts
  sitemap.ts
  docs/
    page.tsx
    [...slug]/
      page.tsx

components/
  layout/
    Header.tsx
    Sidebar.tsx
    Toc.tsx
    Footer.tsx
  ui/
    Breadcrumbs.tsx
    Pagination.tsx
    Callout.tsx
    ThemeToggle.tsx
    CodeBlock.tsx
    CodeBlockClient.tsx
    button.tsx

content/
  python/
  java/
  algorithms/

lib/
  mdx.ts
  navigation.ts
  toc.ts
  utils.ts

styles/
  docs.css

scripts/
  sync-content.mjs

.github/workflows/
  deploy-gh-pages.yml
```

## Local Development

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

Output is generated in `out/`.

## Content Pipeline

Before each build:

```bash
npm run content:sync
```

This syncs legacy `docs/` materials into `content/` and ensures section index pages exist.

## Deployment (GitHub Actions)

Workflow: `.github/workflows/deploy-gh-pages.yml`

Pipeline:

1. Checkout
2. Setup Node.js 20
3. `npm ci`
4. `npm run build`
5. `npm run export` (informational step; static export already produced by build)
6. Deploy `out/` to `gh-pages`

## GitHub Pages Setup

1. Open repository settings.
2. Go to `Pages`.
3. Set source branch to `gh-pages`.
4. Keep folder as `/ (root)`.
5. Push to `main` to trigger deployment.

## Docs Features

- Auto sidebar generation from filesystem
- Auto ToC generation from `h2/h3`
- Active heading tracking
- Breadcrumbs
- Prev/next pagination
- Edit on GitHub link
- Shiki highlighting with copy button and filename support
- MDX callouts (`info`, `warning`, `tip`, `note`)
- Dark theme by default
- SEO metadata + OpenGraph + Twitter cards
- Static `sitemap.xml`, `robots.txt`, and custom `404`
