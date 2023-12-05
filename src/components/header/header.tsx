import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { CustomNavLink } from '@components/custom-nav-link/custom-nav-link';
import { Button } from '@components/button/button';
import { Select } from '@components/select/select';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
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
        Welcome page
      </CustomNavLink>
      <div className={styles.flex}>
        <Select />
        <Button mode="light">Sign Out</Button>
      </div>
    </header>
  );
};
