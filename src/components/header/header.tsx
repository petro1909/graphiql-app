import React from 'react';
import { useLocale } from '@localization/useLocale';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { routes } from '@components/constants/constants';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Button } from '@components/button/button';
import { SelectLanguage } from '@components/selectLanguage/selectLanguage';

import HomeIcon from '@assets/home-icon.svg';
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

  const classNamesSticky = isSticky && classes.headerSmall;

  return (
    <header className={classNames(classNamesSticky, classes.header)}>
      <div>
        <CustomNavLink to={routes.WELCOME_URL} className={classes.link}>
          <img src={HomeIcon} className={classes.homeIcon} alt="home" />
          <label className={classes.desktopLink}>{language.strings.welcomePage} </label>
        </CustomNavLink>
        <div className={classes.flex}>
          <SelectLanguage />
          <Button mode="light">{language.strings.signout}</Button>
        </div>
      </div>
    </header>
  );
};
