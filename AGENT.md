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
| Styling  | **SCSS** — plain-CSS migration is complete; global styles are being rebuilt (see the Current state of the code section) |
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

Accessed live via the `notion` MCP server (added to `~/.config/opencode/opencode.json`, `--global`). Data source: `collection://40ff6bac-afed-8059-8d31-000bbec91626`. Schema: `Nom` (title), `État` (status: `Pas commencé` / `En cours` / `Terminé`), `Étape` (step number 1–39 — the execution order), `Catégorie` (select: Planning / Setup / Build / Content / Personal / Polish / Ship), `Assignation` (person).

**The board owns sequencing. This file owns context.** Read tasks from Notion live — do not mirror them here, they go stale.

Status counts are recorded under "Last verified" at the bottom of this file.

### Board structure

- **Order:** the `Étape` number (1–39) — sort the view by it to see the sequence to work in.
- **Category:** the `Catégorie` property (Planning, Setup, Build, Content, Personal, Polish, Ship). Titles are plain words — no bracket tags.
- **Every card's body carries:** a one-line description, subtasks, and success criteria.

(The old empty stray card with no title was deleted.)

### Board vs. reality — discrepancies to resolve

| Board says | Repo actually has | Action |
| --- | --- | --- |
| Route is **`/projects/:itemId`** | Router is mounted, but the detail route is **`/item/:id`** | Rename to `/projects/:itemId` — the board is authoritative |
| ~~Configure **ESLint & Prettier**~~ | **Oxlint** stays (decided 2026-11-06) | Resolved — recorded on the step 7 card, now `Terminé` |

(Resolved since the last pass: setup tasks and the layout task now carry their true statuses.)

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

### Architecture in place

All components live under **`src/components/`**, one folder per component:

- **`src/components/Router/Router.tsx`** — `BrowserRouter` with `Layout` as the parent route, children `/` (Home), `/about` (About), `/item/:id` (Item), `*` (Error).
- **`src/App.tsx`** — renders `<Router />`. **The router is mounted and working.**
- **`src/main.tsx`** — entry point, renders `<App />`.
- **`src/components/Layout/Layout.tsx`** — `Header` + `<Outlet />` + `Footer`.
- **Page stubs** — `Home`, `About`, `Item`, `Error` each render an empty `<div></div>`.
- **`src/components/Header/Header.tsx`** — French labels `ACCUEIL` (`/`) and `A PROPOS` (`/about`).

### Styling — deliberate decision, do not revert

**`src/index.scss` was deleted on purpose** while rebuilding global styling from scratch. It used to define every design token (`--accent`, `--bg`, `--border`, `--text`, font stacks), `body { margin: 0 }`, the `#root` container, element resets, and dark-mode overrides.

- There are currently **no design tokens anywhere in `src/`**. Do not go looking for them, and do not restore `index.scss` — the owner is rebuilding styling their own way.
- Consequence: the page renders with raw browser defaults until the new global styles land. That is expected, not a bug.

### Build status

`npx tsc -b` ✓ and `npm run lint` ✓ both pass. `npm run build` currently **fails** — see the open build break below.

**Open build break:** `src/App.tsx` imports `./App.scss`, but `src/App.scss` is deleted in the working tree. Vite reports `Could not resolve './App.scss' in src/App.tsx`. Fix is the owner's call: restore the file (`git checkout -- src/App.scss`) or drop the import.

Stylesheets in play: `Layout.tsx` imports `Layout.scss` (new, defines body margin and a dark background). `Header.scss` and `Footer.scss` are imported but empty; the other component `.scss` files are unreferenced placeholders.

### Dead code and orphaned assets

- **`src/App.scss`** — deleted in the working tree while `src/App.tsx` now imports it. Until that is reconciled the build fails (see Build status).
- **`src/components/Header/Header.tsx` line 8** — `<img src="../src/assets/logo.svg" />`. Two bugs: the file has **never existed in git history**, and `../src/assets/…` is a runtime URL path rather than a module import. Also missing `alt`.
- **Orphaned assets, referenced by nothing:** `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`. (`public/favicon.svg` is still used by `index.html`.)

### Styling conventions (once global styles land)

Prefer CSS custom properties over hardcoded values, and reuse the 1024px breakpoint that the existing component SCSS already uses. Component-level SCSS files (`Header.scss`, `Footer.scss`) currently exist but are empty.

---

## 7. Next up

**No blocker — the build is green.** `npm run build` succeeds.

Next work is sequenced on the Notion board, under Task board above. Do not work from a plan in this file; the board is the source of truth for what comes next.

---

## 8. Conventions & gotchas

- **Plain words only** — no abbreviations, invented symbols, or tags that need explaining. If a label needs a paragraph to decode it, rename it. This applies to task names on the board, section references in this file, and card names alike.
- Component layout: one folder per component under `src/components/` (`src/components/Header/Header.tsx` + `Header.scss`), default export, named function.
- French UI labels are intentional (`ACCUEIL`, `A PROPOS`).
- Oxlint, not ESLint — decided 2026-11-06 (no formatter either). No type-aware rules enabled yet.
- `tsconfig.node.json` `include` is now correct (`"vite.config.ts"`). It was broken by an earlier bad edit — double-check it after any tsconfig change.
- Don't commit `node_modules/` or `dist/` (already gitignored).
- Ask before deleting or rewriting committed work — large rewrites are worth confirming first.
- Do not restore `src/index.scss` — its removal was deliberate (explained under Current state of the code).

---

## 9. Open questions for the owner

1. Which **two OpenClassrooms projects** to feature?
2. What is **Project M**? Need a repo link, screenshots, and a one-paragraph description.
3. Is there a **deploy target** (GitHub Pages, Netlify, Vercel)? Affects routing (`BrowserRouter` vs `HashRouter`) and base path.
4. ~~Language of the site~~ **Resolved** — bilingual: French and English, with an EN/FR toggle in the header. Tracked on the Notion board as plain-named language cards.
5. ~~Is the Notion board meant to be read by agents?~~ **Resolved** — board is connected via the `notion` MCP server and read live. Mirror nothing; read from Notion.
6. ~~Lint/format tooling~~ **Resolved** — Oxlint stays, no ESLint or Prettier. Decided on 2026-11-06 when installing the project tooling; recorded on the board (card for step 7, now `Terminé`).

---

## Last verified

Volatile facts live here so the rest of this document stays true. Refresh this block whenever you check.

- **Commit:** `5959614` "Feat: Cleaning Architecture" — 5 commits on `master`. Uncommitted in the working tree: `AGENT.md`, `package.json`, `package-lock.json`, `src/App.tsx`, `src/App.scss` (deleted), `src/components/Layout/Layout.tsx`, `src/components/Layout/Layout.scss` (new).
- **Tooling:** `npx tsc -b` ✓ 0 errors · `npm run lint` ✓ 0 warnings, 0 errors · `npm run build` ✗ fails — `App.tsx` imports the deleted `App.scss` (see Build status).
- **Styling tooling:** `sass-embedded` added to `devDependencies` (uncommitted).
- **Notion board:** 39 tasks — 3 `Terminé`, 5 `En cours`, 31 `Pas commencé`. Ordered by `Étape` (1–39); subtasks are checklists (`- [x]` = done) and every card has success criteria; category lives in the `Catégorie` property, titles carry no tags.
