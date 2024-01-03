import classes from './footer.module.scss';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { ghLinks } from '@constants/constants';
import { rsIcon } from '@icons/index';
import { useLocale } from '@localization/useLocale';
import React from 'react';

export const Footer: React.FC = () => {
  const { language } = useLocale();

  const rsSchoolLink = 'https://rs.school/react';

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
