# AGENT.md — Portfolio Project Brief

> Read this first. It is the hand-off document for future sessions working on this repo.

---

# Important

You're my teaching Agent, you're supposed to guide me toward a solution not to produce working code. Do not ask shallow questions, you're here to provide context. I will interact with you asking questions.

You're expected to verify if the code got updated before answering questions

Its possible to give new functions with a short presentation but you should let me figure out how it works.

Your role is strictly educational. You're not supposed to edit code. You're supposed to answer questions on a technical level, give hints or propose functions to use to solve a problem.

Do not plan a lot of steps at once. We want an atomic approach, one problematic at a time.

Im a FrontEnd student.

## 1. What this project is

Personal portfolio site for **MarronFrui** (GitHub: <https://github.com/MarronFrui>).

Repo: <https://github.com/MarronFrui/portfolio> — local path `/home/marron/work/project7`, branch `master`.

**Goal:** showcase skills and projects, with two hard requirements (listed under "Requirements from the owner" below).

---

## 2. Tech stack (fixed, do not change)

| Layer    | Choice                                          |
| -------- | ----------------------------------------------- |
| Build    | **Vite 8**                                      |
| UI       | **React 19**                                    |
| Language | **TypeScript ~7.0** (`strict` via `tsc -b`)     |
| Routing  | **react-router-dom ^7.18**                      |
| Styling  | **SCSS** (migration from plain CSS in progress) |
| Lint     | **Oxlint** (`npm run lint`)                     |

Scripts: `npm run dev` · `npm run build` (`tsc -b && vite build`) · `npm run lint` · `npm run preview`.

---

## 3. Requirements from the owner

### Must-have

1. **Promote at least 2 OpenClassrooms projects.**
2. Vite + React + TypeScript stack.
3. A **carousel** on the home page to swap between project previews.
4. Clicking a preview navigates to a **detail page keyed by `ItemId`** (route is **`/projects/:itemId`**, per the Notion board) presenting that project.

### Nice-to-have — "Personal projects" section

A separate section for personal work, distinct from the OC coursework:

| Project                      | Status            | Notes                                                                                                                                                                                                                         |
| ---------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Noita Livemap** ← flagship | Work in progress  | Fork of [acidflow-noita/noitamap](https://github.com/acidflow-noita/noitamap). Owner is **reverse-engineering Noita's map generation** to rebuild it — long-term effort, but promotable now. Repo: `MarronFrui/noita-livemap` |
| **Pokémon shiny bot hunter** | Written in Python | Repo: `MarronFrui/pokemon-farmer`. Owner is a front-end dev and explicitly says Python "is not my cup of tea" — present it as breadth, don't lean on it                                                                       |
| **Project M**                | —                 | Scraper + multimedia **homelab streaming service**. No public repo found on the account; ask the owner for a link or description before writing copy                                                                          |

---

## 4. Task board

Notion database **"Portfolio"** (Kanban, grouped by status):
<https://app.notion.com/p/40ff6bacafed80ebbec2ea84a961ad94?v=40ff6bacafed8088bc1c000c002aa4e1>

Accessed live via the `notion` MCP server (added to `~/.config/opencode/opencode.json`, `--global`). Data source: `collection://40ff6bac-afed-8059-8d31-000bbec91626`. Schema: `Nom` (title), `État` (status: `Pas commencé` / `En cours` / `Terminé`), `Assignation` (person).

> **Status: 34 tasks, 1 done.** Only `[Planning] Plan the portfolio in Notion` is `Terminé`. Everything else is `Pas commencé`. The board is the source of truth for sequencing; this file is the source of truth for _context_.

### Board contents (as of last sync)

**[Planning]** — Define goals, audience & positioning · ~~Plan the portfolio in Notion~~ ✓ · Pick the OpenClassrooms projects to showcase · Sitemap & wireframes · Choose visual identity · Gather assets for every project · Write the project case studies

**[Setup]** — Initialize Vite + React + TypeScript project · Configure TypeScript strict mode, ESLint & Prettier · Choose styling approach & global design tokens · Define folder structure & project data model · Set up routing (`/` and `/projects/:itemId`) · Create GitHub repo, README & branching

**[Build]** — Layout: header, navigation & footer · Hero / intro section · Carousel component · Project preview card (carousel slide) · Project detail page (ItemId) · 404 page & invalid itemId handling

**[Content]** — About & Contact sections · Add OpenClassrooms project #1 · Add OpenClassrooms project #2

**[Personal]** — Design the Personal Projects section · Noita Livemap project entry · Pokémon shiny hunter bot entry · Project M entry (scraper + homelab streaming)

**[Polish]** — Responsive design pass · Accessibility audit · Performance optimization · SEO & meta tags · Tests (Vitest + React Testing Library)

**[Ship]** — Deploy the portfolio · Final QA & promote

> One row has a null `Nom` — an empty stray card, safe to ignore or delete.

### Board vs. reality — discrepancies to resolve

| Board says | Repo actually has | Action |
| --- | --- | --- |
| Route is **`/projects/:itemId`** | Nav links to `/` and `/about`; no router mounted | Use `/projects/:itemId` — the board is authoritative |
| Configure **ESLint & Prettier** | **Oxlint** configured, no ESLint/Prettier present | Confirm: adopt Oxlint, or add ESLint+Prettier as the board says |
| `[Setup]` tasks all `Pas commencé` | Vite+React+TS **already initialized**, repo exists, routing **partially** started (Layout/Header/Footer exist) | Mark these done or `En cours` in Notion |
| `[Build] Layout` `Pas commencé` | `src/components/Layout/`, `src/components/Header/`, `src/components/Footer/` exist but broken/unwired | Close to `En cours` |

---

## 5. Content sources — candidate OpenClassrooms projects

All in <https://github.com/MarronFrui?tab=repositories>. Pick **two** (owner's call) — front-end leaning ones fit the portfolio best:

| Repo                            | Tech               | Notes                                   |
| ------------------------------- | ------------------ | --------------------------------------- |
| `kasa-openclassroom`            | React              | Strongest fit — same stack as this site |
| `Site-sophie-bluel-educational` | JavaScript         | Classic OC front-end project            |
| `Nina-Carducci-Dev-Educational` | HTML               | SEO-focused                             |
| `booki-starter`                 | HTML/CSS           | Vitrine site                            |
| `mon-vieux-grimoire`            | Express (back-end) | Shows full-stack range                  |
| `base-du-web`                   | HTML               | Tutorial, probably too basic            |

Other personal repos worth mentioning: `noitamap` (the upstream fork), `input-per-second`, `Aim-Training`.

---

## 6. Current state of the code

**Committed** through `9c228fa` ("Feat: Global architecture") — 4 commits on `master`, all pushed. Working tree is clean except `AGENT.md`.

Commits: `ff5e1b6` structure + plan → `db32f51` page scaffolds → `9c228fa` router + page stubs.

### Tooling status

| Command | Result |
| --- | --- |
| `npx tsc -b` | ✓ passes (0 errors) |
| `npm run lint` (oxlint) | ✓ 0 warnings, 0 errors — 11 files, 116 rules |
| `npm run build` | ✗ **fails** |

### The one build blocker

`npm run build` runs `tsc -b && vite build`. Type-checking passes; **Vite fails**:

```
[UNRESOLVED_IMPORT] Could not resolve './index.css' in src/main.tsx
```

Two stale CSS imports survive from before the SCSS migration:

1. `src/main.tsx:3` → `import './index.css'` — file was renamed to `index.scss`
2. `src/App.tsx` → `import './App.css'` — file was renamed to `App.scss`

Both are one-word fixes. Nothing else blocks the build.

### Architecture in place

- **`src/components/Router/Router.tsx`** — `BrowserRouter` with `Layout` as the parent route, children `/` (Home), `/about` (About), `/item/:id` (Item), `*` (Error).
- **`src/components/Layout/Layout.tsx`** — `Header` + `<Outlet />` + `Footer`.
- **Page stubs** — `Home`, `About`, `Item`, `Error` each render an empty `<div></div>`. Their `.scss` files exist but are **empty**.
- **`src/components/Header/Header.tsx`** — French labels `ACCUEIL` (`/`) and `A PROPOS` (`/about`).

### Gaps

1. **`Router` is defined but never mounted.** `src/main.tsx` still renders bare `<App />` — so the router, layout, and all four pages are dead code right now.
2. **Route mismatch:** code uses **`/item/:id`**, the Notion board specifies **`/projects/:itemId`**. Board is authoritative — rename before building the detail page, or the nav/URLs will drift.
3. `src/components/Header/Header.tsx` references `src/assets/logo.svg` — **file not in repo**; `<img>` also lacks `alt`.
4. `src/components/Layout/Layout.tsx` imports `./Layout.scss` — **does not exist**.
5. `src/App.tsx` still holds the **stock Vite template** (counter, docs/social links).
6. Nothing built yet: no carousel, no project data model, no detail-page content, no Personal Projects section.

### Assets available

`src/assets/hero.png`, `react.svg`, `vite.svg` · `public/favicon.svg`, `public/icons.svg`.

### Styling conventions

`src/index.scss` defines design tokens as CSS custom properties on `:root`: `--text`, `--text-h`, `--bg`, `--border`, `--accent`, `--accent-bg`, `--accent-border`, `--social-bg`, `--shadow`, plus font stacks `--sans`, `--heading`, `--mono`. Dark mode via `prefers-color-scheme`. Breakpoint used throughout: `1024px`. **Reuse these tokens — do not hardcode colors.**

---

## 7. Suggested next steps

In order:

1. **Fix the build** — the two stale CSS imports described under "Current state of the code". Verify with `npm run build`.
2. **Mount `Router` in `main.tsx`** — replace `<App />` with `<Router />`; retire or repurpose `App.tsx`.
3. **Rename `/item/:id` → `/projects/:itemId`** to match the board, before anything links to it.
4. **Add the missing assets** — `logo.svg`, `Layout.scss`, fill `Header.scss`/`Footer.scss`.
5. **Design the project data model** — a typed `Project` interface (`id`, `title`, `description`, `tags`, `repoUrl`, `previewImage`, `stack`, `highlights`) backed by a static TS array. Feeds both the carousel and the detail route.
6. **Build the carousel** — home-page section, previews swap on click/arrows.
7. **Build `/projects/:itemId`** — detail page reading `useParams()`, with a fallback for unknown ids (board has a dedicated "404 page & invalid itemId handling" task).
8. **Add the "Personal projects" section** — the table of Noita Livemap / Pokémon bot / Project M under "Requirements from the owner".
9. **Pick the two OC projects** with the owner, then write their copy.
10. **Mark progress on the Notion board** as tasks land — 33 of 34 are still `Pas commencé`, several already partially done.

---

## 8. Conventions & gotchas

- Component layout: one folder per component (`src/components/Header/Header.tsx` + `Header.scss`), default export, named function.
- French UI labels are intentional (`ACCUEIL`, `A PROPOS`).
- Oxlint, not ESLint. No type-aware rules enabled yet.
- `tsconfig.node.json` `include` is fragile — it was broken by a bad edit; double-check it after any tsconfig change.
- Don't commit `node_modules/` or `dist/` (already gitignored).
- Ask before deleting or rewriting committed work — the SCSS migration and page scaffolds are already in history, but large rewrites are still worth confirming.

---

## 9. Open questions for the owner

1. Which **two OpenClassrooms projects** to feature?
2. What is **Project M**? Need a repo link, screenshots, and a one-paragraph description.
3. Is there a **deploy target** (GitHub Pages, Netlify, Vercel)? Affects routing (`BrowserRouter` vs `HashRouter`) and base path.
4. **Language of the site** — French, English, or bilingual? Nav labels are currently French. (Board task titles are French, which hints French — but confirm.)
5. ~~Is the Notion board meant to be read by agents?~~ **Resolved** — board is connected via the `notion` MCP server and read live. Mirror nothing; read from Notion.
6. **Lint/format tooling** — the board says ESLint & Prettier, the repo has Oxlint. Adopt Oxlint (less config, already working) or follow the board?
