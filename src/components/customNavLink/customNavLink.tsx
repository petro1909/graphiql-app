import { NavLink, LinkProps } from 'react-router-dom';
import classNames from 'classnames';

import styles from './customNavLink.module.scss';

type CustomNavLinkProps = Pick<LinkProps, 'to' | 'children' | 'target' | 'className'>;

export const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, children, className, target }) => {
  return (
    <NavLink to={to} className={classNames(styles.link, className)} target={target}>
      {children}
    </NavLink>
  );
};
