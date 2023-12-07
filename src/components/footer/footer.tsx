import React from 'react';
import { useLocale } from '@localization/useLocale';
import { CustomNavLink } from '@components/customNavLink/customNavLink';

import rsLogo from '@assets/rs_school_js.svg';
import styles from './footer.module.scss';

export const Footer: React.FC = () => {
  const { language } = useLocale();

  const rsSchoolLink = 'https://rs.school/react';
  const petrGithubLink = 'https://github.com/petro1909';
  const nataliaGithubLink = 'https://github.com/nataliavozhdaeva';
  const daryaGithubLink = 'https://github.com/DaryaBobko';

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapperInfo}>
        <CustomNavLink to={rsSchoolLink} className={styles.link} target="blank">
          <img src={rsLogo} className={styles.logo} alt="rs school" />
        </CustomNavLink>
        {language.strings.created}
      </div>
      <div className={styles.flex}>
        {language.strings.createdBy}:
        <CustomNavLink to={petrGithubLink} className={styles.link} target="blank">
          {language.strings.petrName}
        </CustomNavLink>
        /
        <CustomNavLink to={nataliaGithubLink} className={styles.link} target="blank">
          {language.strings.nataliaName}
        </CustomNavLink>
        /
        <CustomNavLink to={daryaGithubLink} className={styles.link} target="blank">
          {language.strings.daryaName}
        </CustomNavLink>
      </div>
    </footer>
  );
};
