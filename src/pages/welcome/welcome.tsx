import classes from './welcome.module.scss';
import { Button } from '@components/button/button';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { routes } from '@constants/constants';
import { useLocale } from '@localization/useLocale';
import React from 'react';

export const Welcome: React.FC = () => {
  const { language } = useLocale();

  const isAuth = true;

  return (
    <section className={classes.welcome}>
      <div className="flex-center">
        <div className={classes.bigText}>{language.strings.welcome}</div>

        <div className={classes.actionWrapper}>
          {isAuth ? (
            <CustomNavLink to={routes.MAIN_URL}>
              <Button>{language.strings.mainPage}</Button>
            </CustomNavLink>
          ) : (
            <CustomNavLink to={routes.AUTH_URL}>{language.strings.authorization}</CustomNavLink>
          )}
        </div>
      </div>
    </section>
  );
};
