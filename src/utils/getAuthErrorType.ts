import { AuthErrors } from '@app_types/authErrors';
import { FirebaseError } from '@firebase/util';

export const parseAuthError = (error?: FirebaseError): AuthErrors => {
  const formErrors: AuthErrors = {};
  if (!error) return formErrors;
  const errMessage = error.message;
  if (errMessage.includes('password')) {
    formErrors.password = error;
  } else if (errMessage.includes('email')) {
    formErrors.email = error;
  } else {
    formErrors.form = error;
  }
  return formErrors;
};
