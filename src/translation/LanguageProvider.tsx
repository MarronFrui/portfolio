import { useEffect, useState, type ReactNode } from 'react';
import { LanguageContext } from './languageContext';
import { detectLanguage, saveLanguage, translate, type Language } from './translate';

function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
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
