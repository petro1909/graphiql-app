import { routes } from '@constants/constants';
import { auth } from '@database/context';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate to={routes.SIGN_IN} replace />;
  }

  return <>{children}</>;
};
