import { createContext, useContext } from 'react';
import type { Language, TranslationKey } from './translate';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: TranslationKey) => string;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

// In a component: const { translate } = useLanguage(); translate('NAV_HOME')
export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return value;
}
