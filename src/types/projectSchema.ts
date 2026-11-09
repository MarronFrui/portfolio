export type Project = {
  id: string;
  category: 'professional' | 'personal';
  title: { en: string; fr: string };
  summary: { en: string; fr: string };
  description: { en: string; fr: string };
  stack: string[];
  cover: { src: string; alt: { en: string; fr: string } };
  video?: string;
  screenshots?: { src: string; alt: { en: string; fr: string } }[];
  repoUrl?: string;
  liveUrl?: string;
  status: 'done' | 'in-progress';
  featured?: boolean; // Is it a professional project or not
};
