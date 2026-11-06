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

**Goal:** showcase skills and projects, with two hard requirements (see §3).

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
4. Clicking a preview navigates to a **detail page keyed by `ItemId`** (i.e. `/project/:id`) presenting that project.

### Nice-to-have — "Personal projects" section

A separate section for personal work, distinct from the OC coursework:

| Project                      | Status            | Notes                                                                                                                                                                                                                         |
| ---------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Noita Livemap** ← flagship | Work in progress  | Fork of [acidflow-noita/noitamap](https://github.com/acidflow-noita/noitamap). Owner is **reverse-engineering Noita's map generation** to rebuild it — long-term effort, but promotable now. Repo: `MarronFrui/noita-livemap` |
| **Pokémon shiny bot hunter** | Written in Python | Repo: `MarronFrui/pokemon-farmer`. Owner is a front-end dev and explicitly says Python "is not my cup of tea" — present it as breadth, don't lean on it                                                                       |
| **Project M**                | —                 | Scraper + multimedia **homelab streaming service**. No public repo found on the account; ask the owner for a link or description before writing copy                                                                          |

---

## 4. Task board

Notion (owner's planning board): <https://app.notion.com/p/40ff6bacafed80ebbec2ea84a961ad94?v=40ff6bacafed8088bc1c000c002aa4e1>

> The owner stated the **"must have" tasks are done** on that board. Pull the remaining tasks from Notion at the start of a session — it is the source of truth for sequencing, this file is the source of truth for _context_.

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

**The build is broken.** Nothing has been committed since `Initial commit` (`bc019e0`); all work below is uncommitted.

### What's in progress

- Migration **CSS → SCSS**: `src/App.css` and `src/index.css` deleted, replaced by `src/App.scss` and `src/index.scss`.
- New layout components: `src/Layout/Layout.tsx` (uses `<Outlet />`), `src/Header/Header.tsx`, `src/Footer/Footer.tsx`.
- `react-router-dom` added to `package.json`.
- `Header.tsx` nav already uses French labels: `ACCUEIL` (`/`) and `A PROPOS` (`/about`).

### Build blockers (`npm run build` fails)

1. `tsconfig.node.json` — `include` changed to `"../vite.config.ts"`; must be `"vite.config.ts"`.
2. `src/Footer/Footer.tsx` — unused `Link` import (TS6133).

### Latent failures (surface once #1 and #2 are fixed)

3. `src/main.tsx` imports deleted `./index.css` → should be `./index.scss`.
4. `src/App.tsx` imports deleted `./App.css` → should be `./App.scss`.
5. `src/Layout/Layout.tsx` imports `./Layout.scss` — **file does not exist**. `Header.scss` and `Footer.scss` exist but are **empty**.

### Functional gaps

6. **No router is mounted.** `Layout`/`Header`/`Footer` are never rendered; `main.tsx` still renders bare `<App />`. The `/about` route linked in the nav does not exist.
7. `src/Header/Header.tsx` references `src/assets/logo.svg` — **file not in repo**. It also needs an `alt` attribute.
8. The app still renders the **stock Vite template page** (counter, docs/social links) — not portfolio content.
9. No carousel, no project data model, no `/project/:id` detail route — the must-have features are entirely unbuilt.

### Assets available

`src/assets/hero.png`, `react.svg`, `vite.svg` · `public/favicon.svg`, `public/icons.svg`.

### Styling conventions

`src/index.scss` defines the design tokens as CSS custom properties on `:root`: `--text`, `--text-h`, `--bg`, `--border`, `--accent`, `--accent-bg`, `--accent-border`, `--social-bg`, `--shadow`, plus font stacks `--sans`, `--heading`, `--mono`. Dark mode is handled via `prefers-color-scheme`. Breakpoint used throughout: `1024px`. **Reuse these tokens — do not hardcode colors.**

---

## 7. Suggested next steps

In order:

1. **Fix the build** — items 1–5 in §6. Verify with `npm run build` and `npm run lint`.
2. **Mount the router** — `BrowserRouter` in `main.tsx`, `Layout` as the route tree, create `Home` and `About` routes, replace the Vite template `App.tsx` content.
3. **Add the missing assets** — `logo.svg`, `Layout.scss`, fill `Header.scss`/`Footer.scss`.
4. **Design the project data model** — a typed `Project` interface (`id`, `title`, `description`, `tags`, `repoUrl`, `previewImage`, `stack`, `highlights`) backed by a static TS array or JSON. This feeds both the carousel and the detail route.
5. **Build the carousel** — home-page section, previews swap on click/arrows.
6. **Build `/project/:id`** — detail page reading `useParams()`, with a fallback for unknown ids.
7. **Add the "Personal projects" section** — §3 table.
8. **Pick the two OC projects** with the owner, then write their copy.

---

## 8. Conventions & gotchas

- Component layout: one folder per component (`src/Header/Header.tsx` + `Header.scss`), default export, named function.
- French UI labels are intentional (`ACCUEIL`, `A PROPOS`).
- Oxlint, not ESLint. No type-aware rules enabled yet.
- `tsconfig.node.json` `include` is fragile — it was broken by a bad edit; double-check it after any tsconfig change.
- Don't commit `node_modules/` or `dist/` (already gitignored).
- Ask before deleting or rewriting the SCSS work in progress — it is uncommitted and would be lost.

---

## 9. Open questions for the owner

1. Which **two OpenClassrooms projects** to feature?
2. What is **Project M**? Need a repo link, screenshots, and a one-paragraph description.
3. Is there a **deploy target** (GitHub Pages, Netlify, Vercel)? Affects routing (`BrowserRouter` vs `HashRouter`) and base path.
4. **Language of the site** — French, English, or bilingual? Nav labels are currently French.
5. Is the Notion board meant to be read by agents (shared), or should tasks be mirrored into this file?
