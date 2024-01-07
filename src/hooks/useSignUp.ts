import { auth } from '@database/context';
import { useLocale } from '@localization/useLocale';
import { FirebaseError } from 'firebase/app';
import { User, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';

type SignUpFunction = (email: string, password: string, name: string) => Promise<void | User>;

const useSignUp: () => [SignUpFunction, string | undefined | null, boolean] = () => {
  const { language } = useLocale();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const signUp = (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);

    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        setLoading(false);
        setError(null);

        return updateProfile(userCredential.user, { displayName: name }).then(() => userCredential.user);
      },
      (err) => {
        setLoading(false);
        if (err instanceof FirebaseError) {
          return setError(err.message);
        }

        return setError(language.strings.errorMessages.sthWrong);
      }
    );
  };

  return [signUp, error, loading];
};

export default useSignUp;
