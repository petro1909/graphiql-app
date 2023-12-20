import React from 'react';
import { Outlet } from 'react-router';

import classes from './auth.module.scss';

export const AuthorizationPage: React.FC = () => {
  return (
    <section className={classes.auth}>
      <Outlet />
    </section>
  );
};
