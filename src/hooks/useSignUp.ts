import { auth } from '@database/context';
import { useLocale } from '@localization/useLocale';
import { User, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';

type SignUpFunction = (email: string, password: string, name: string) => Promise<void | User>;

const useSignUp: () => [SignUpFunction, string | undefined, boolean] = () => {
  const { language } = useLocale();
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const signUp = (email: string, password: string, name: string) => {
    setLoading(true);
    setError(undefined);

    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        setLoading(false);
        setError(undefined);

        return updateProfile(userCredential.user, { displayName: name }).then(() => userCredential.user);
      },
      () => {
        setLoading(false);

        return setError(language.strings.errorMessages.sthWrong);
      }
    );
  };

  return [signUp, error, loading];
};

export default useSignUp;
