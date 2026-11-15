import { useEffect, useState, type ReactNode } from 'react';
import { LanguageContext } from './languageContext';
import { detectLanguage, saveLanguage, translate, type Language } from './translate';

function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    // Keep the head tags in sync with the visible language; index.html ships
    // the English defaults and the fr.json keys translate them.
    document.title = translate(language, 'PAGE_TITLE');
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', translate(language, 'PAGE_DESCRIPTION'));
  }, [language]);

  const setLanguage = (next: Language) => {
    saveLanguage(next);
    setLanguageState(next);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translate: (key, params) => translate(language, key, params) }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
