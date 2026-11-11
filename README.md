# Portfolio — Maxime Fels

My personal portfolio: a single page (hero, about, personal projects, study projects) whose header links scroll to each section. Personal projects are picked from a row of thumbnails and shown large; study project cards play a preview video on hover and open a detail view on click. The theme follows the system light/dark preference.

Built with React 19, TypeScript, Sass and Vite.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build to dist/
npm run preview   # serve the built site
npm run lint      # run Oxlint
```

## Project structure

```
src/
  main.tsx          entry point
  App.tsx
  components/       one folder per component (.tsx + .scss)
  data/             projects (text fields are translation keys)
  translation/      en.json, fr.json and translate()
  types/            TypeScript types
  styles/           global styles and Sass variables
  assets/           images and videos
```

To add a project, add an entry in `src/data/projects.ts` and import its images there. Its text goes in `src/translation/en.json` and `src/translation/fr.json`.

## Translations

All text lives in two flat files, `src/translation/en.json` and `src/translation/fr.json`: one key, one string. In a component, `const { translate } = useLanguage();` then `translate('NAV_HOME')`.

The site starts in the browser's language and the FR / EN toggle in the header overrides it (saved in localStorage). The build fails if `fr.json` is missing a key that `en.json` has.

The CV download button serves `public/cv.pdf`.
