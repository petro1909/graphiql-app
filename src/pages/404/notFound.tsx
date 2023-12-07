import React from 'react';
import { useLocale } from '@localization/useLocale';

import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Button } from '@components/button/button';

import styles from './notFound.module.scss';

export const NotFound: React.FC = () => {
  const { language } = useLocale();
  const homeLink = '/';

  return (
    <section className={styles.notFound}>
      <div className={styles.wrapperInfo}>
        <div className={styles.bigText}>404</div>
        <div className={styles.text}>{language.strings.pageMissing}</div>
        <div className={styles.smallText}>{language.strings.pageNotExist}</div>
        <CustomNavLink to={homeLink}>
          <Button>{language.strings.backToHomepage}</Button>
        </CustomNavLink>
      </div>
    </section>
  );
};
