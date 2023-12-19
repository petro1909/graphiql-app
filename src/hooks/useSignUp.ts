import { auth } from '@dataBase/initialApp';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const useSignUp = () => {
  const signUp = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, { displayName: name });

    return userCredential.user;
  };

  return { signUp };
};

export default useSignUp;
