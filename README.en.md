# Static Academic Website — Usage & Structure Manual

Read in: [Português](README.pt.md)

This repository hosts my bilingual (PT/EN) static academic website. The site is hash‑routed (`#/pt/...`, `#/en/...`), fully data‑driven via JSON and Markdown files, and deployed with GitHub Pages. This document describes how the site is structured and how to perform the most common content updates (posts, slides, publications, CV, apps, and the home illustration).

## Quick Map of the Repository

```
/
├─ index.html
├─ script.js
├─ styles.css
├─ apps/
│  ├─ apps.json
│  ├─ router.js
│  └─ <app-slug>/
├─ assets/
│  └─ img/
│     ├─ hero_gallery/
│     │  └─ hero.json
│     └─ <current-hero-images>
├─ cv/
│  ├─ cv.pt.md
│  └─ cv.en.md
├─ posts/
│  ├─ posts.json
│  └─ *.md
├─ publications/
│  ├─ articles.json
│  ├─ book-chapters.json
│  ├─ reports.json
│  ├─ op-eds.json
│  └─ repos.json
├─ projects/
│  └─ projects.json
├─ slides/
│  ├─ slides.json
│  ├─ archived/ (create when needed)
│  └─ <slide-slug>/
├─ rss-pt.xml
└─ rss-en.xml
```

## Apps Hosted on the Site

- Lotteries — [README](apps/lotteries/README.en.md)

## Core Concepts

### Languages

All content is bilingual. For any JSON content item that supports `lang`, use only `"pt"` or `"en"` (case‑sensitive).

Language switch behavior depends on content type:

- Posts and Projects: use `group` to find the counterpart in the other language.
- Publications and Slides: use a **hybrid rule** (described below) to show the current language when both exist, or the only available language if only one exists.

### `slug` vs `group`

- `slug`: technical identifier used in URLs, filenames, and routing. Must be unique within the same language.
- `group`: conceptual identifier used only to pair PT/EN equivalents of the same item.

Rule of thumb: routing uses `slug`; language pairing uses `group`.

### Date format

Use `YYYY-MM-DD` everywhere (posts, slides, publications). Sorting is descending by date.

### Hybrid display rule (Publications and Slides)

If the same item exists in PT and EN, the site shows only the current language version. If only one version exists, it appears on both languages.

- Publications key priority: `group` → `doi` → `issn` → `url` → `title`.
- Slides key priority: `group` → `slug` → `pdf`.

## Site Pages and How to Update Them

### Home (`#/pt` / `#/en`)

Home has three main parts:

1. Intro text (hardcoded in `script.js` under `i18n`).
2. “Illustration of the Month” (hero image).
3. Latest posts (last 3 posts of the current language).

#### Updating the hero illustration

- Edit `assets/img/hero_gallery/hero.json`.
- Add the image files:
  - Current (active) hero images live in `assets/img/`.
  - Archived images live in `assets/img/hero_gallery/`.

Each item in `hero.json`:

```
{
  "month": "YYYY-MM",
  "archived": false,
  "title": { "pt": "...", "en": "..." },
  "alt": { "pt": "...", "en": "..." },
  "base": { "pt": "filename-pt", "en": "filename-en" },
  "description": { "pt": "...", "en": "..." }
}
```

Notes:

- `base` is a filename **without extension**. The site appends `.webp` automatically.
- If `archived: true`, the image is loaded from `assets/img/hero_gallery/`.
- If `archived: false`, the image is loaded from `assets/img/`.
- If there is no matching item for the current month, the latest one is used.

### Blog (`#/pt/blog`, `#/en/blog`)

Blog posts are controlled by `posts/posts.json` and Markdown files in `posts/`.

Example item:

```
{
  "group": "2026-01-my-post",
  "slug": "2026-01-my-post-en",
  "title": "My Post",
  "date": "2026-01-25",
  "tags": ["ai", "regulation"],
  "lang": "en",
  "file": "posts/2026-01-my-post.en.md"
}
```

Rules:

- The blog index filters by `lang`.
- The post page loads the Markdown file from `file`.
- Language switch uses `group` (if no counterpart exists, it redirects to the blog list).

#### Add a new post

1. Create a Markdown file in `posts/`.
2. Add an entry in `posts/posts.json`.
3. Update `rss-pt.xml` or `rss-en.xml` (see RSS section below).

### Slides (`#/pt/slides`, `#/en/slides`)

Slides are controlled by `slides/slides.json`. Each slide can have an HTML viewer and a PDF.

Example item:

```
{
  "group": "my-talk-2026",
  "slug": "my-talk-2026",
  "title": "My Talk",
  "event": "Conference 2026",
  "date": "2026-02-10",
  "html": "my-talk-2026.html",
  "pdf": "my-talk-2026.pdf",
  "lang": "en",
  "project": "project-slug",
  "archive": false
}
```

Rules:

- Active slides: `archive: false`.
- Archived slides: `archive: true` and shown only at `#/pt/archived` or `#/en/archived`.
- If `pdf_url` is provided, it overrides the local PDF path.
- Local paths for active slides:
  - HTML: `slides/<slug>/<html>`
  - PDF: `slides/<slug>/<pdf>`
- Local paths for archived slides:
  - PDF: `slides/archived/<pdf>`
  - Create `slides/archived/` the first time you need it.

#### Add a new slide deck

1. Create a folder `slides/<slug>/`.
2. Add `<html>` and `<pdf>` files there.
3. Add an entry in `slides/slides.json`.
4. If the slide belongs to a project, set `project` to the project’s `slug`.

### Projects (linked from Slides)

Projects are defined in `projects/projects.json`. The Projects page is not in the main nav anymore, but it still exists and is linked from the Slides page.

A project only appears if it has at least one **active** slide with `slides.project === projects.slug`.

Example item:

```
{
  "group": "regnum",
  "slug": "project-regnum",
  "lang": "en",
  "title": "Regulation in Numbers",
  "description": "...",
  "tags": ["regulation", "data science"]
}
```

### Publications (`#/pt/publications`, `#/en/publications`)

Publications are split by type and stored in separate JSON files:

- `publications/articles.json`
- `publications/book-chapters.json`
- `publications/reports.json`
- `publications/op-eds.json`
- `publications/repos.json`
 
`publications/publications.json` is a legacy file and is not used by the current site code.

All items share a common schema:

```
{
  "type": "article",
  "title": "...",
  "authors": ["..."],
  "date": "YYYY-MM-DD",
  "publication": "...",
  "url": "https://...",
  "lang": "pt",
  "doi": "...",
  "issn": "...",
  "group": "...",
  "cv": true
}
```

Notes:

- `type` must match the file it is stored in.
- `group` is strongly recommended when there are PT/EN equivalents.
- Reports and book chapters can include `subtype_pt` and `subtype_en`, which appear as prefixes in the UI.
- The Publications page is grouped by type in collapsible sections.

### CV (`#/pt/cv`, `#/en/cv`)

The CV page renders Markdown files in `cv/`:

- `cv/cv.pt.md`
- `cv/cv.en.md`

Below the CV text, the site shows “Selected publications” using entries that have `"cv": true` in the publications files. The same hybrid language rule applies here.

### Apps (`#/pt/apps`, `#/en/apps`)

Apps are listed in `apps/apps.json` and are lazy‑loaded by `apps/router.js`. Each app lives in its own folder and must export a `mountApp(mount, { lang })` function from `apps/<slug>/index.js`.

Example catalog entry:

```
{
  "slug": "lotteries",
  "title": { "pt": "Simulador de Loterias", "en": "Lottery Simulator" },
  "description": { "pt": "...", "en": "..." },
  "tags": { "pt": ["..."], "en": ["..."] },
  "status": "skeleton"
}
```

#### Add a new app

1. Create `apps/<slug>/index.js` with `export async function mountApp(mount, { lang }) { ... }`.
2. Add any assets inside the app folder.
3. Register the app in `apps/apps.json`.
4. Add a separate README inside the app folder if needed.

## RSS Feeds

The RSS feeds are maintained manually:

- `rss-pt.xml`
- `rss-en.xml`

When you publish a new post:

1. Update `<lastBuildDate>`.
2. Add a new `<item>` with title, link, guid, pubDate, and categories.
3. Keep items in reverse chronological order.

## Maintenance Checklist

- `lang` is always `pt` or `en`.
- Dates are `YYYY-MM-DD` and sortable.
- `group` is used only for language pairing.
- Posts point to existing Markdown files.
- Slides reference existing HTML/PDF files or have a `pdf_url`.
- Projects only appear if they have active slides.
- Publications are placed in the correct type file.
- CV items are marked with `"cv": true`.
- RSS feeds are kept in sync with the blog.
