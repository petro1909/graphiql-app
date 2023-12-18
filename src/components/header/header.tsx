import React from 'react';
import { useLocale } from '@localization/useLocale';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@dataBase/initialApp';
import { routes } from '@constants/constants';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Button } from '@components/button/button';
import { SelectLanguage } from '@components/selectLanguage/selectLanguage';

import HomeIcon from '@assets/home-icon.svg';
import classes from './header.module.scss';

export const Header: React.FC = () => {
  const { language } = useLocale();
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [user] = useAuthState(auth);

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

  const handleLogout = async () => {
    await signOut(auth);
    navigate(routes.WELCOME_URL);
  };

  const classNamesSticky = isSticky && classes.headerSmall;

  return (
    <header className={classNames(classNamesSticky, classes.header)}>
      <div className={classes.headerContent}>
        <CustomNavLink to={routes.WELCOME_URL} className={classes.link}>
          <img src={HomeIcon} className={classes.homeIcon} alt="home" />
          <label className={classes.desktopLink}>{language.strings.welcomePage} </label>
        </CustomNavLink>
        <div className={classes.flex}>
          <SelectLanguage />
          <Button mode="light" onClick={handleLogout}>
            {language.strings.signout}
          </Button>
        </div>
      </div>
      {user?.email}
    </header>
  );
};
