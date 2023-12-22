import classes from './auth.module.scss';
import { routes } from '@constants/constants';
import { auth } from '@dataBase/initialApp';

import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';

export const AuthorizationPage: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      return navigate(routes.MAIN_URL);
    }
  }, [user, navigate]);

  return (
    <section className={classes.auth}>
      <Outlet />
    </section>
  );
};
