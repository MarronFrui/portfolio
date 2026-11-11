export type LocalizedText = { en: string; fr: string };

export type Project = {
  id: string;
  category: 'professional' | 'personal';
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  stack: string[];
  cover: { src: string; alt: LocalizedText };
  video?: string;
  repoUrl?: string;
  liveUrl?: string;
  status: 'done' | 'in-progress';
};
