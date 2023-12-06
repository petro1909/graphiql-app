import React from 'react';
import { LocaleContext } from './localeProvider';

export const useLocale = () => React.useContext(LocaleContext);
