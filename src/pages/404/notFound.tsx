import React from 'react';
import { useLocale } from '@localization/useLocale';

import { routes } from '@components/constants/constants';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Button } from '@components/button/button';

import classes from './notFound.module.scss';

export const NotFound: React.FC = () => {
  const { language } = useLocale();

  return (
    <section className={classes.notFound}>
      <div className={classes.wrapperInfo}>
        <div className={classes.bigText}>404</div>
        <div className={classes.text}>{language.strings.pageMissing}</div>
        <div className={classes.smallText}>{language.strings.pageNotExist}</div>
        <CustomNavLink to={routes.MAIN_URL}>
          <Button>{language.strings.backToMainPage}</Button>
        </CustomNavLink>
      </div>
    </section>
  );
};
