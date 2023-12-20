import classNames from 'classnames';
import { LinkProps, NavLink } from 'react-router-dom';

import classes from './customNavLink.module.scss';

type CustomNavLinkProps = Pick<LinkProps, 'to' | 'children' | 'target' | 'className'>;

export const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, children, className, target }) => {
  return (
    <NavLink to={to} className={classNames(classes.link, className)} target={target}>
      {children}
    </NavLink>
  );
};
