import { Button } from '@components/button/button';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { routes } from '@constants/constants';
import { useLocale } from '@localization/useLocale';
import React from 'react';

import classes from './notFound.module.scss';

export const NotFound: React.FC = () => {
  const { language } = useLocale();

  return (
    <section className={classes.notFound}>
      <div className="flex-center">
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
