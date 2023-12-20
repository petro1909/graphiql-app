import { Language, languages } from './languages';
import { BaseProps } from '@app_types/baseProps';
import { createContext, useState } from 'react';

type LocaleContextType = {
  language: Language;
  handleChangeLanguage: (languageName: string) => void;
};

export const LocaleContext = createContext<LocaleContextType>({ language: languages.EN, handleChangeLanguage: () => {} });
export const LocaleProvider = ({ children }: BaseProps) => {
  const [language, setLanguage] = useState<Language>(() => languages[localStorage.getItem('lang') as keyof typeof languages] || languages.EN);

  const handleChangeLanguage = (language: string) => {
    setLanguage(languages[language as keyof typeof languages]);
    localStorage.setItem('lang', language);
  };

  return <LocaleContext.Provider value={{ language, handleChangeLanguage }}>{children}</LocaleContext.Provider>;
};
