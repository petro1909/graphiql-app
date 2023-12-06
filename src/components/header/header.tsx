import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Button } from '@components/button/button';
import { SelectLanguage } from '@components/selectLanguage/selectLanguage';

import styles from './header.module.scss';
import React from 'react';
import { useLocale } from '@localization/useLocale';

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

  const classNamesSticky = isSticky ? styles.sticky : '';

  return (
    <header className={classNames(classNamesSticky, styles.header)}>
      <CustomNavLink to="/" className={styles.link}>
        {language.strings.welcomePage}
      </CustomNavLink>
      <div className={styles.flex}>
        <SelectLanguage />
        <Button mode="light">{language.strings.signout}</Button>
      </div>
    </header>
  );
};
