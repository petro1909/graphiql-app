import { FirebaseError, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env._API_KEY,
  authDomain: import.meta.env._AUTH_DOMAIN,
  projectId: import.meta.env._PROJECT_ID,
  storageBucket: import.meta.env._STORAGE_BUCKET,
  messagingSenderId: import.meta.env._MESSAGING_SENDER_ID,
  appId: import.meta.env._APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const userRegister = async (email: string, password: string, name?: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    name && (await updateProfile(user, { displayName: name }));
  } catch (err) {
    throw err as FirebaseError;
  }
};

export const userLogin = async (login: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, login, password);
    return userCredential.user;
  } catch (err) {
    throw err as FirebaseError;
  }
};

export const userLogout = async () => {
  await signOut(auth);
};
