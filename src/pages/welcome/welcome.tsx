import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@dataBase/initialApp';
import { useLocale } from '@localization/useLocale';
import { link, routes } from '@constants/constants';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Button } from '@components/button/button';

import classes from './welcome.module.scss';

export const Welcome: React.FC = () => {
  const { language } = useLocale();
  const [user] = useAuthState(auth);

  const progectInfoLink = 'https://github.com/rolling-scopes-school/tasks/blob/master/react/README.md';
  const courseInfoLink = 'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md';

  return (
    <section className={classes.welcome}>
      <div className="flex-center">
        <div className={classes.bigText}>{language.strings.welcome}</div>
        <div className={classes.additionalInfo}>
          <div>
            {language.strings.projectWasCreated}
            <CustomNavLink to={link.petrGithubLink} className={classes.link} target="blank">
              {language.strings.petrName}
            </CustomNavLink>
            ,{' '}
            <CustomNavLink to={link.nataliaGithubLink} className={classes.link} target="blank">
              {language.strings.nataliaName}
            </CustomNavLink>
            ,{' '}
            <CustomNavLink to={link.daryaGithubLink} className={classes.link} target="blank">
              {language.strings.daryaName}
            </CustomNavLink>
          </div>
          <div>
            {language.strings.additionalInformation}
            <CustomNavLink to={progectInfoLink}> {language.strings.project}</CustomNavLink> {language.strings.andAbout}
            <CustomNavLink to={courseInfoLink}> {language.strings.course} </CustomNavLink>
          </div>
        </div>
        <div className={classes.actionWrapper}>
          {user ? (
            <CustomNavLink to={routes.MAIN_URL}>
              <Button>{language.strings.mainPage}</Button>
            </CustomNavLink>
          ) : (
            <div className={classes.authButtonWrapper}>
              <CustomNavLink to={routes.SIGN_IN}>
                <Button>{language.strings.signIn}</Button>
              </CustomNavLink>
              <CustomNavLink to={routes.SIGN_UP}>
                <Button>{language.strings.signUp}</Button>
              </CustomNavLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
