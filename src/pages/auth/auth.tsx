import React from 'react';

import classes from './auth.module.scss';
import { Outlet } from 'react-router';

export const AuthorizationPage: React.FC = () => {
  return (
    <section className={classes.auth}>
      <Outlet />
    </section>
  );
};
