# AGENT.md — Portfolio Project Brief

> Read this first. It is the hand-off document for future sessions working on this repo.
> Rebuilt from scratch on 2026-11-11 after the redesign; anything older (carousel, router, detail pages, skill bars) is gone on purpose.

---

## 1. What this project is

Personal portfolio of **Maxime Fels** (GitHub: [MarronFrui](https://github.com/MarronFrui)), front-end developer.

- Repo: <https://github.com/MarronFrui/portfolio>, local path `/home/marron/work/project7`, branch `master`.
- **One single page**, bilingual French / English, light or dark following the system.
- Goal: show who the owner is and what he actually did on each project. The personal projects carry the personality; the study projects prove the basics.

---

## 2. Tech stack (fixed, do not change)

| Layer    | Choice                                                          |
| -------- | --------------------------------------------------------------- |
| Build    | Vite 8                                                          |
| UI       | React 19                                                        |
| Language | TypeScript ~7.0 (`tsc -b` in the build)                         |
| Styling  | SCSS (`sass-embedded`), colours in CSS custom properties        |
| Lint     | Oxlint (`npm run lint`), no ESLint, no Prettier, no formatter   |
| Routing  | **None.** `react-router-dom` was removed: the site is one page  |

Scripts: `npm run dev` · `npm run build` (`tsc -b && vite build`) · `npm run lint` · `npm run preview`.

TypeScript 7 ships no `tsserver`, so VS Code may fall back to its own TypeScript and show stale errors. `npx tsc -b` is the reference; restart the TS server in the editor if it disagrees.

---

## 3. The page, top to bottom

Rendered by `App.tsx`: `LanguageProvider` > `Header` + `Home` + `Footer`.

| Section             | Anchor            | What it shows                                                                                         |
| ------------------- | ----------------- | ----------------------------------------------------------------------------------------------------- |
| Header (sticky)     | —                 | Anchor links that smooth-scroll to each section, and the FR / EN toggle on the right                  |
| Hero                | `#home`           | Name, tagline, **Download my CV (PDF)** button, "See my projects" button                              |
| About               | `#about`          | Two paragraphs — **placeholder text**, the owner will write his own                                    |
| _(preferred stack)_ | —                 | **Planned, not built.** A marked comment in `Home.tsx` holds its place. Replaces the old skill bars    |
| Personal projects   | `#projects`       | Styled after <https://joe.arkaans.com/work>: a row of thumbnails, and a large showcase of the picked one |
| Study projects      | `#study-projects` | The OpenClassrooms coursework, as cards in a grid, at the bottom of the page on purpose               |
| Footer              | `#contact`        | GitHub link and e-mail                                                                                |

### Personal projects (`PersonalProjects` component)

- Thumbnails show the project name; hovering shows its main language (`stack[0]`). Clicking one picks it; the first project is picked on load.
- The showcase: era label, large thin title in the accent colour, outlined tech pills, GitHub button top right, large screenshot (plays the video on hover if the project has one), status line, summary, "My role" bullets, live demo button if any.
- **Noita Livemap must stay first**: it is the most personal project and gives the page its personality.

### Study projects (`Card` + `ProjectModal`)

- Each card: cover image, preview video that plays on hover or keyboard focus and rewinds on leave, title, summary, "My role" bullets, stack, GitHub button.
- Clicking anywhere on a card opens `ProjectModal` (native `<dialog>`: Escape, × or a backdrop click closes it). The GitHub button on the card still goes straight to GitHub.
- Phones have no hover, so videos do not play there; the cover image shows. Not yet decided whether to play them while on screen instead.

### Era labels

Shown above the showcase title, set per project with `era`:

- `'ai-first'` — gradient label. **Only Noita Livemap.**
- `'pre-ai'` — quiet dashed label. Pokémon Farmer, MaxFlix, Aim Training, Input Per Second.
- No `era` — no label (the study projects).

### CV download

The button links to `/cv.pdf` and saves it as `Maxime-Fels-CV.pdf`. **`public/cv.pdf` does not exist yet** — the owner must add it. One PDF for both languages.

---

## 4. Code map

```
src/
  main.tsx                     entry point, imports styles/global.scss
  App.tsx                      LanguageProvider > Header + Home + Footer
  components/                  one folder per component: Name.tsx + Name.scss
    Header/  Footer/  Home/
    PersonalProjects/          thumbnail row + showcase
    Card/                      study project card
    ProjectModal/              detail view of a study project
  hooks/useHoverVideo.ts       play a muted video on hover/focus, rewind on leave
  data/projects.ts             every project; text fields are translation keys
  types/project.ts             the Project type
  translation/                 en.json, fr.json, translate(), language context
  styles/_variables.scss       Sass names pointing at the CSS custom properties
  styles/global.scss           theme colours, body, buttons, era labels, smooth scroll
  assets/                      covers (png/jpg) and videos/ (mp4)
public/                        favicon; cv.pdf goes here
```

### Projects data

`src/data/projects.ts` — one entry per project:

- `category`: `'personal'` or `'study'`. Order in the array is the order on the page.
- `title`, `summary`, `role[]`, `cover.alt` hold **translation keys**, never text.
- `stack[]` (plain strings, not translated), `cover.src`, optional `video`, `repoUrl`, `liveUrl`, `era`, and `status` (`'done'` | `'in-progress'`).

| Project            | Category | Era      | Status      | Repo                                  | Live demo |
| ------------------ | -------- | -------- | ----------- | ------------------------------------- | --------- |
| Noita Livemap      | personal | ai-first | in progress | `MarronFrui/noita-livemap`            | —         |
| Kasa               | study    | —        | done        | `MarronFrui/kasa-openclassroom`       | —         |
| Mon Vieux Grimoire | study    | —        | done        | `MarronFrui/mon-vieux-grimoire`       | —         |
| Sophie Bluel       | study    | —        | done        | `MarronFrui/Site-sophie-bluel-educational` | —    |
| Pokémon Farmer     | personal | pre-ai   | in progress | `MarronFrui/pokemon-farmer`           | —         |
| MaxFlix            | personal | pre-ai   | in progress | `MarronFrui/ProjectM`                 | —         |
| Aim Training       | personal | pre-ai   | done        | `MarronFrui/Aim-Training`             | GitHub Pages |
| Input Per Second   | personal | pre-ai   | done        | `MarronFrui/input-per-second`         | GitHub Pages |

Only the three study projects have videos. The Aim Training and Input Per Second covers are screenshots taken by an agent from the running sites; replace them if better ones exist.

**The "My role" bullets are drafts** written from old descriptions and from reading the repos. They are not confirmed facts about what the owner did — the owner will rewrite them. Do not present them as verified.

To add a project: add the entry in `projects.ts`, import its images there, and add its keys to both JSON files.

---

## 5. Translations

The owner's rule (from a senior tech lead friend): **two flat JSON files, one key → one string, no nesting.** Do not restructure them.

- `src/translation/en.json` and `fr.json`. Keys are `UPPER_SNAKE_CASE`: `NAV_*`, `HERO_*`, `ABOUT_*`, `SECTION_*`, `PROJECT_*` for UI labels, `PROJECT_<ID>_TITLE / _SUMMARY / _ROLE_<n> / _COVER_ALT` for project text.
- In a component: `const { translate } = useLanguage();` then `translate('NAV_HOME')`.
- `en.json` is the reference: `TranslationKey` is its keys, and **the build fails if `fr.json` misses one** or if a component uses an unknown key.
- Language: the choice made with the header toggle (saved in `localStorage` under `language`) wins; otherwise the browser's language (French if it prefers French, else English). `<html lang>` follows.
- Not translated: the browser tab title and meta description in `index.html`, the stack pills, the CV file. The "AI-first" label stays in English in `fr.json` too.
- French and English only. No other languages planned.

---

## 6. Styling

- **Theme follows the system** through `prefers-color-scheme`; there is deliberately **no theme toggle**. Light is the default in `:root`, dark overrides it in the media query (`global.scss`). `index.html` declares `<meta name="color-scheme" content="light dark">`.
- Colours are CSS custom properties (`--color-bg`, `--color-accent`, …). In SCSS, use the Sass names from `_variables.scss` (`$color-accent` → `var(--color-accent)`); never hardcode a colour that must change with the theme.
- Shared classes in `global.scss`: `.button`, `.button--ghost`, `.button--contrast` (dark on light, light on dark), `.era-label`, `.era-label--pre-ai`.
- Font: Montserrat from Google Fonts, weights 200–700 (200 is the showcase title).
- Breakpoint: `$breakpoint-mobile: 768px`. Content width: `$content-width: 1200px`. Header height: `$header-height: 64px`, also used by `scroll-padding-top` so anchored sections land below the sticky header.
- Respect `prefers-reduced-motion`: smooth scroll, hover lifts and entrance animations are turned off for it.

---

## 7. Task board

Notion database **"Portfolio"**: <https://app.notion.com/p/40ff6bacafed80ebbec2ea84a961ad94?v=40ff6bacafed8088bc1c000c002aa4e1>

Read live through the `notion` MCP server. Data source `collection://40ff6bac-afed-8059-8d31-000bbec91626`. Properties: `Nom` (title), `État` (`Pas commencé` / `En cours` / `Terminé`), `Étape` (execution order), `Catégorie` (Planning / Setup / Build / Content / Personal / Polish / Ship), `Assignation`.

**The board predates the 2026-11-11 redesign.** It still describes a carousel, a `/projects/:itemId` detail route, skill bars and a separate About page. Where the board and this file disagree, this file reflects the owner's latest decisions; the board needs updating (ask the owner before rewriting cards).

---

## 8. Conventions & gotchas

- **Plain words only** — no abbreviations, invented symbols, or tags that need explaining, in code, labels, board cards and this file alike.
- One folder per component under `src/components/`, `Name.tsx` + `Name.scss`, default export, named function.
- All visible text goes through `translate()`. No hardcoded UI strings in components.
- Wording on the site: "study projects", never "OpenClassrooms" (renamed on purpose). The only remaining occurrence is the Kasa repository URL, which is its real address.
- Read functions off `useHoverVideo()` by destructuring (`const { ref, play, stop } = useHoverVideo()`); passing `hook.play` trips Oxlint's "refs during render" rule.
- Don't commit `node_modules/` or `dist/` (gitignored).
- Ask before deleting or rewriting committed work.

---

## 9. Open items for the owner

1. Add `public/cv.pdf`.
2. Rewrite the "My role" bullets and the About text (both languages).
3. Build the **preferred stack** section.
4. Decide whether project videos should play on phones while the card is on screen.
5. Deploy target (GitHub Pages, Netlify, Vercel)? With no router, only the base path matters now (`base` in `vite.config.ts` for a GitHub Pages sub-path, and the `/cv.pdf` link).
6. Update the Notion board to match the redesign.

---

## Last verified

Volatile facts live here so the rest of this document stays true. Refresh this block whenever you check.

- **2026-11-11**, commit `0e0f960` "REFACTOR: General design changes", 23 commits on `master`. Uncommitted at that time: the move of `src/i18n` to `src/translation`, the "study projects" rename, this file.
- **Tooling:** `npx tsc -b` ✓ · `npm run lint` ✓ 0 warnings, 0 errors · `npm run build` ✓.
- **Translations:** 79 keys in each JSON file.
