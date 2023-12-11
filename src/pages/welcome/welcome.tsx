import React from 'react';
import { useLocale } from '@localization/useLocale';

import { routes } from '@components/constants/constants';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Button } from '@components/button/button';

import classes from './welcome.module.scss';

export const Welcome: React.FC = () => {
  const { language } = useLocale();

  const isAuth = true;

  return (
    <section className={classes.welcome}>
      <div className={classes.wrapperInfo}>
        <div className={classes.bigText}>{language.strings.welcome}</div>

        <div className={classes.actionWrapper}>
          {isAuth ? (
            <CustomNavLink to={routes.MAIN_URL}>
              <Button>{language.strings.mainPage}</Button>
            </CustomNavLink>
          ) : (
            <CustomNavLink to={routes.AUTH_URL}>{language.strings.signIn}</CustomNavLink>
          )}
        </div>
      </div>
    </section>
  );
};
