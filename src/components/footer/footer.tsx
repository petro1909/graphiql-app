import rsLogo from '@assets/rs_school_js.svg';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { ghLinks } from '@constants/constants';
import { useLocale } from '@localization/useLocale';
import React from 'react';

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
        <CustomNavLink to={ghLinks.petrGithubLink} className={classes.link} target="blank">
          {language.strings.petrName}
        </CustomNavLink>
        /
        <CustomNavLink to={ghLinks.nataliaGithubLink} className={classes.link} target="blank">
          {language.strings.nataliaName}
        </CustomNavLink>
        /
        <CustomNavLink to={ghLinks.daryaGithubLink} className={classes.link} target="blank">
          {language.strings.daryaName}
        </CustomNavLink>
      </div>
    </footer>
  );
};
