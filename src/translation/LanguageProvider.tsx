import { useEffect, useState, type ReactNode } from 'react';
import { LanguageContext } from './languageContext';
import { detectLanguage, saveLanguage, translate, type Language } from './translate';

// Holds the current language so the whole page re-renders when it changes.
function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  useEffect(() => {
    // Screen readers and the browser's spell checker use this.
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (next: Language) => {
    saveLanguage(next);
    setLanguageState(next);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translate: (key) => translate(language, key) }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
