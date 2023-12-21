import { LocaleContext } from './localeProvider';
import { useContext } from 'react';

export const useLocale = () => useContext(LocaleContext);
