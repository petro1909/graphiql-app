import React from 'react';
import { useLocale } from '@localization/useLocale';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { rsIcon } from '@assets/index';
import classes from './footer.module.scss';

export const Footer: React.FC = () => {
  const { language } = useLocale();

  const rsSchoolLink = 'https://rs.school/react';
  const petrGithubLink = 'https://github.com/petro1909';
  const nataliaGithubLink = 'https://github.com/nataliavozhdaeva';
  const daryaGithubLink = 'https://github.com/DaryaBobko';

  return (
    <footer className={classes.footer}>
      <div className={classes.wrapperInfo}>
        <CustomNavLink to={rsSchoolLink} className={classes.link} target="blank">
          <img src={rsIcon} className={classes.logo} alt="rs school" />
        </CustomNavLink>
        {language.strings.created}
      </div>
      <div className={classes.flex}>
        {language.strings.createdBy}:
        <CustomNavLink to={petrGithubLink} className={classes.link} target="blank">
          {language.strings.petrName}
        </CustomNavLink>
        /
        <CustomNavLink to={nataliaGithubLink} className={classes.link} target="blank">
          {language.strings.nataliaName}
        </CustomNavLink>
        /
        <CustomNavLink to={daryaGithubLink} className={classes.link} target="blank">
          {language.strings.daryaName}
        </CustomNavLink>
      </div>
    </footer>
  );
};
