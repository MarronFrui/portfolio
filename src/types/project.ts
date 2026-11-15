import type { TranslationKey } from '../translation/translate';

// Text fields hold keys of src/translation/en.json and fr.json, not the text itself.
export type Project = {
  id: string;
  category: 'study' | 'personal';
  era?: 'ai-first' | 'pre-ai';
  title: TranslationKey;
  summary: TranslationKey;
  role: TranslationKey[];
  stack: string[];
  cover: { src: string; alt: TranslationKey };
  video?: string;
  repoUrl?: string;
  liveUrl?: string;
  playable?: boolean;
  status: 'done' | 'in-progress';
};
