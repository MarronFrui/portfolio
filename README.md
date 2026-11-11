# Portfolio — Maxime Fels

My personal portfolio: a home page with my skills and two 3D carousels (OpenClassrooms projects and personal projects), and a detail page for each project.

Built with React 19, TypeScript, React Router, Sass and Vite.

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
  data/             projects and skills
  types/            TypeScript types
  styles/           global styles and Sass variables
  assets/           images and videos
```

To add a project, add an entry in `src/data/projects.ts` and import its images there.
