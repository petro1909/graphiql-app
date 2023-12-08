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
        <div className={classes.bigText}>{language.strings.Welcome}</div>

        <div className={classes.actionWrapper}>
          {isAuth ? (
            <CustomNavLink to={routes.HOME_URL}>
              <Button>{language.strings.Homepage}</Button>
            </CustomNavLink>
          ) : (
            <CustomNavLink to={routes.AUTH_URL}>{language.strings.SignIn}</CustomNavLink>
          )}
        </div>
      </div>
    </section>
  );
};
