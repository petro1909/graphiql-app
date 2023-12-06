import { FirebaseError } from '@firebase/util';

export type AuthErrors = {
  email?: FirebaseError;
  password?: FirebaseError;
  form?: FirebaseError;
};
