import React from 'react';
import { useLocale } from '@localization/useLocale';

import { routes } from '@constants/constants';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Button } from '@components/button/button';

import classes from './welcome.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@dataBase/initialApp';

export const Welcome: React.FC = () => {
  const { language } = useLocale();
  const [user] = useAuthState(auth);

  return (
    <section className={classes.welcome}>
      <div className="flex-center">
        <div className={classes.bigText}>{language.strings.welcome}</div>

        <div className={classes.actionWrapper}>
          {user ? (
            <CustomNavLink to={routes.MAIN_URL}>
              <Button>{language.strings.mainPage}</Button>
            </CustomNavLink>
          ) : (
            <CustomNavLink to={routes.SIGN_IN}>{language.strings.authorization}</CustomNavLink>
          )}
        </div>
      </div>
    </section>
  );
};
