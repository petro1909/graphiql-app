import classes from './welcome.module.scss';
import { auth } from '../../dataBase/initialApp';
import { Button } from '@components/button/button';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { ghLinks, routes } from '@constants/constants';
import { useLocale } from '@localization/useLocale';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Welcome: React.FC = () => {
  const { language } = useLocale();
  const [user] = useAuthState(auth);

  return (
    <section className={classes.welcome}>
      <div className="flex-center">
        <div className={classes.bigText}>{language.strings.welcome}</div>
        <div className={classes.additionalInfo}>
          {language.strings.projectWasCreated}
          <CustomNavLink to={ghLinks.petrGithubLink} className={classes.link} target="blank">
            {language.strings.petrName}
          </CustomNavLink>
          ,
          <CustomNavLink to={ghLinks.nataliaGithubLink} className={classes.link} target="blank">
            <> {language.strings.nataliaName}</>
          </CustomNavLink>
          ,
          <CustomNavLink to={ghLinks.daryaGithubLink} className={classes.link} target="blank">
            <> {language.strings.daryaName}</>
          </CustomNavLink>
          <div>
            {language.strings.additionalInformation}
            <CustomNavLink to={ghLinks.projectInfoLink}> {language.strings.project}</CustomNavLink> {language.strings.andAbout}
            <CustomNavLink to={ghLinks.courseInfoLink}> {language.strings.course} </CustomNavLink>
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
