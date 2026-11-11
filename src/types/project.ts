import type { TranslationKey } from '../translation/translate';

// Text fields hold keys of src/translation/en.json and fr.json, not the text itself.
export type Project = {
  id: string;
  category: 'study' | 'personal';
  // Label shown on the project: built AI-first, or before AI tools.
  era?: 'ai-first' | 'pre-ai';
  title: TranslationKey;
  summary: TranslationKey;
  // My actual role and what I did on the project, one key per bullet.
  role: TranslationKey[];
  stack: string[];
  cover: { src: string; alt: TranslationKey };
  video?: string;
  repoUrl?: string;
  liveUrl?: string;
  status: 'done' | 'in-progress';
};
