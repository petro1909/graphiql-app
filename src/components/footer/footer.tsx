import React from 'react';
import { useLocale } from '@localization/useLocale';
import { CustomNavLink } from '@components/customNavLink/customNavLink';

import rsLogo from '../../assets/rs_school_js.svg';
import styles from './footer.module.scss';

export const Footer: React.FC = () => {
  const { language } = useLocale();

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapperInfo}>
        <CustomNavLink to="https://rs.school/react" className={styles.link} target="blank">
          <img src={rsLogo} className={styles.logo} alt="rs school" />
        </CustomNavLink>
        {language.strings.created}
      </div>
      <div className={styles.flex}>
        {language.strings.createdBy}:
        <CustomNavLink to="https://github.com/petro1909" className={styles.link} target="blank">
          {language.strings.petrName}
        </CustomNavLink>
        /
        <CustomNavLink to="https://github.com/nataliavozhdaeva" className={styles.link} target="blank">
          {language.strings.nataliaName}
        </CustomNavLink>
        /
        <CustomNavLink to="https://github.com/DaryaBobko" className={styles.link} target="blank">
          {language.strings.daryaName}
        </CustomNavLink>
      </div>
    </footer>
  );
};
