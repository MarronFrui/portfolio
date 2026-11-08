export type Project = {
  id: string; // 'noita-livemap' — draggable into the URL
  title: { en: string; fr: string };
  summary: { en: string; fr: string }; // the card's one line
  description: { en: string; fr: string }; // the detail page's text
  stack: string[];
  cover: { src: string; alt: { en: string; fr: string } };
  video?: string; // optional — enhancement, never guaranteed
  screenshots?: { src: string; alt: { en: string; fr: string } }[];
  repoUrl?: string;
  liveUrl?: string;
  status: 'done' | 'in-progress';
  featured?: boolean; // the two home carousel picks
};
