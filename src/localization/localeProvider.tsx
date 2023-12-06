import { BaseProps } from '@app_types/baseProps';
import { createContext } from 'react';
import { useState } from 'react';
import { Language, languages } from './languages';

type LocaleContextType = {
  language: Language;
  setLanguage: (languageName: string) => void;
};

export const LocaleContext = createContext<LocaleContextType>({ language: languages.EN, setLanguage: () => {} });
export const LocaleProvider = ({ children }: BaseProps) => {
  const [language, updateLanguage] = useState<Language>(() => languages[localStorage.getItem('lang') as keyof typeof languages] || languages.EN);

  const setLanguage = (language: string) => {
    updateLanguage(languages[language as keyof typeof languages]);
    localStorage.setItem('lang', language);
  };

  return <LocaleContext.Provider value={{ language, setLanguage }}>{children}</LocaleContext.Provider>;
};
