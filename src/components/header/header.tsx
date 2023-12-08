import React from 'react';
import { useLocale } from '@localization/useLocale';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { HOME_URL } from '@components/constants/constants';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Button } from '@components/button/button';
import { SelectLanguage } from '@components/selectLanguage/selectLanguage';

import classes from './header.module.scss';

export const Header: React.FC = () => {
  const { language } = useLocale();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const classNamesSticky = isSticky && classes.sticky;

  return (
    <header className={classNames(classNamesSticky, classes.header)}>
      <CustomNavLink to={HOME_URL} className={classes.link}>
        {language.strings.welcomePage}
      </CustomNavLink>
      <div className={classes.flex}>
        <SelectLanguage />
        <Button mode="light">{language.strings.signout}</Button>
      </div>
    </header>
  );
};
