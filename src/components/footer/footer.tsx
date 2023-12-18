import React from 'react';

import { useLocale } from '@localization/useLocale';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { link } from '@constants/constants';

import rsLogo from '@assets/rs_school_js.svg';
import classes from './footer.module.scss';

export const Footer: React.FC = () => {
  const { language } = useLocale();

  const rsSchoolLink = 'https://rs.school/react';

  return (
    <footer className={classes.footer}>
      <div className={classes.wrapperInfo}>
        <CustomNavLink to={rsSchoolLink} className={classes.link} target="blank">
          <img src={rsLogo} className={classes.logo} alt="rs school" />
        </CustomNavLink>
        {language.strings.created}
      </div>
      <div className={classes.flex}>
        {language.strings.createdBy}:
        <CustomNavLink to={link.petrGithubLink} className={classes.link} target="blank">
          {language.strings.petrName}
        </CustomNavLink>
        /
        <CustomNavLink to={link.nataliaGithubLink} className={classes.link} target="blank">
          {language.strings.nataliaName}
        </CustomNavLink>
        /
        <CustomNavLink to={link.daryaGithubLink} className={classes.link} target="blank">
          {language.strings.daryaName}
        </CustomNavLink>
      </div>
    </footer>
  );
};
