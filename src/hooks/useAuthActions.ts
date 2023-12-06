import { AuthErrors } from '@app_types/authErrors';
import { FirebaseError } from '@firebase/util';
import { userRegister, userLogin, userLogout } from '@service/authenticationService';
import { parseAuthError } from '@utils/getAuthErrorType';
import { useState } from 'react';

export const useAuthActions = () => {
  const [authErrors, updateAuthErrors] = useState<AuthErrors>({});

  const register = async (email: string, password: string, name?: string) => {
    try {
      await userRegister(email, password, name);
      updateAuthErrors({});
    } catch (err) {
      const fbError = err as FirebaseError;
      updateAuthErrors(parseAuthError(fbError));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await userLogin(email, password);
      updateAuthErrors({});
    } catch (err) {
      const fbError = err as FirebaseError;
      updateAuthErrors(parseAuthError(fbError));
    }
  };

  const logout = async () => {
    updateAuthErrors({});
    await userLogout();
  };
  return { authErrors, register, login, logout };
};
