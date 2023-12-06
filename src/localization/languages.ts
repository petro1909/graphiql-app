import enStrings from '@lang/en.json';
import ruStrings from '@lang/ru.json';

export type Language = {
  name: string;
  title: string;
  strings: typeof enStrings;
};
export const languages = {
  EN: { name: 'EN', title: 'English', strings: enStrings },
  RU: { name: 'RU', title: 'Russian', strings: ruStrings },
};
