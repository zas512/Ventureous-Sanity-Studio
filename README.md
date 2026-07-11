# Ventureous

Sanity Studio for **Ventureous** — a content platform for startup pitches, blogs, and marketing pages.

## About

This repo is the CMS backend for Ventureous. Editors manage startup pitches, blog posts, landing pages, navigation, and site settings from a customized Sanity Studio. Content is modeled for a frontend that supports pitch submissions, voting, AI analysis, and visual page building.

## Features

- **Startup pitches** — markdown pitch content, categories, cover images, and read-only AI analysis fields
- **Page builder** — homepage sections (hero, logo ticker, top pitches, integrations, FAQ) plus reusable blocks
- **Blog & pages** — nested URL slugs, SEO/Open Graph fields, and redirect management
- **Site configuration** — singleton documents for navbar, footer, settings, and blog index
- **Visual editing** — Presentation tool with live preview against your frontend
- **Custom Studio UX** — Lucide icon picker, slug validation, media library, and Unsplash asset source
- **Automation** — Sanity Function creates redirects when document slugs change on publish
- **Type safety** — schema extraction and TypeGen (`schema.json`, `sanity.types.ts`)

## Tech stack

- [Sanity Studio v6](https://www.sanity.io/)
- React 19 + TypeScript
- Sanity Presentation, Vision, Media, Markdown, and Unsplash plugins
- Sanity Blueprints & Functions

## Getting started

### Prerequisites

- Node.js 20+
- A Sanity project and dataset

### Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=Ventureous
SANITY_STUDIO_PRESENTATION_URL=http://localhost:3000
SANITY_STUDIO_API_VERSION=2025-05-08
```

### Development

```bash
npm run dev
```

Studio runs at [http://localhost:3333](http://localhost:3333).

### Build & deploy

```bash
npm run build    # production build
npm run deploy   # deploy to Sanity hosting
npm start        # serve production build locally
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server with schema extraction & typegen |
| `npm run build` | Build Studio for production |
| `npm run deploy` | Deploy Studio to Sanity |
| `npm run deploy-graphql` | Deploy GraphQL API |
| `npm start` | Serve built Studio locally |

## Project structure

```
├── components/          # Custom Studio components (slug field, icon picker, logo)
├── functions/           # Sanity Functions (auto-redirect on slug change)
├── plugins/             # Studio plugins (presentation URL action)
├── schemaTypes/         # Document, block, and field schemas
├── utils/               # Helpers, structure, SEO fields, slug validation
├── sanity.config.ts     # Studio configuration
├── sanity.cli.ts        # CLI, deployment, schema extraction, typegen
└── sanity.blueprint.ts  # Blueprint for Sanity Functions
```

## Content model

| Type | Purpose |
| --- | --- |
| `startup` | Startup pitch submissions |
| `blog`, `blogIndex` | Blog posts and listing page |
| `page`, `homePage` | Marketing and landing pages |
| `navbar`, `footer`, `settings` | Global site configuration |
| `faq`, `category`, `playlist`, `author` | Supporting content |
| `redirect` | URL redirects |

## License

UNLICENSED — private project.
