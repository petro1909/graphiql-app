import { auth } from '@dataBase/initialApp';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const useSignUp = () => {
  const signUp = (email: string, password: string, name: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      return updateProfile(userCredential.user, { displayName: name }).then(() => userCredential.user);
    });
  };

  return { signUp };
};
export default useSignUp;
