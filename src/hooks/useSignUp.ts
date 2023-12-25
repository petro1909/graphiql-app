import { auth } from '@database/context';
import { useLocale } from '@localization/useLocale';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';

const useSignUp = () => {
  const { language } = useLocale();
  const [error, setError] = useState<string | undefined>(undefined);

  const signUp = (email: string, password: string, name: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        return updateProfile(userCredential.user, { displayName: name }).then(() => userCredential.user);
      },
      () => {
        return setError(language.strings.errorMessages.sthWrong);
      }
    );
  };

  return { signUp, error };
};
export default useSignUp;
