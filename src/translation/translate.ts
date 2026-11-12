import en from './en.json';
import fr from './fr.json';

// Two flat files: one key, one string. en.json is the reference list of keys.
export type TranslationKey = keyof typeof en;
export type Language = 'en' | 'fr';

// Fails the type check if fr.json misses a key that en.json has.
const dictionaries: Record<Language, Record<TranslationKey, string>> = { en, fr };

// Strings may hold {name} placeholders, filled from params.
export function translate(
  language: Language,
  key: TranslationKey,
  params: Record<string, string | number> = {},
): string {
  return dictionaries[language][key].replace(/\{(\w+)\}/g, (_, name) => String(params[name]));
}

const STORAGE_KEY = 'language';

// The language picked with the toggle wins; otherwise the browser's language.
export function detectLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'en' || saved === 'fr') return saved;

  for (const browserLanguage of navigator.languages) {
    const code = browserLanguage.slice(0, 2).toLowerCase();
    if (code === 'fr' || code === 'en') return code;
  }
  return 'en';
}

export function saveLanguage(language: Language) {
  localStorage.setItem(STORAGE_KEY, language);
}
