import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import { useLocale } from '@localization/useLocale';
import { SignInFormData } from '@models/authForm';
import { routes } from '@constants/constants';
import { Input } from '@components/input/input';
import { Button } from '@components/button/button';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { useSignInFormSchema } from './useSignInFormSchema';
import { firebaseConfig } from '../../../../firebaseConfig';

import classes from '../auth.module.scss';
import { createUserWithEmailAndPassword, getAuth, signOut } from '@firebase/auth';

import { initializeApp } from 'firebase/app';
import { Alert } from '@components/alert/alert';

const firebaseApp = initializeApp(firebaseConfig);

export const SignIn: React.FC = () => {
  const { language } = useLocale();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted) {
      navigate(routes.MAIN_URL);
    }
  }, [isSubmitted, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: yupResolver(useSignInFormSchema) });

  const auth = getAuth(firebaseApp);

  const [user, loading, error] = useAuthState(auth);

  const onSubmit = async (data: SignInFormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      // await signInWithEmailAndPassword(auth, data.email, data.password);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Registered User: {user.email} </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
  return (
    <div className={classes.wrapperForm}>
      {!error && <Alert message={'error.message'} />}
      <form className={classNames('flex-center', classes.authForm)} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.title}>{language.strings.signIn}</h1>
        <Input
          error={errors.email?.message}
          label={language.strings.authEmailLabel}
          placeholder={language.strings.authEmailPlaceholder}
          {...register('email')}
        />
        <Input
          error={errors.password?.message}
          label={language.strings.authPasswordLabel}
          placeholder={language.strings.authPasswordPlaceholder}
          {...register('password')}
        />

        <div className={classes.buttonWrapper}>
          <Button type="submit">{language.strings.signIn}</Button>
          <CustomNavLink to={routes.SIGN_UP}>
            <Button mode="light">{language.strings.signUp}</Button>
          </CustomNavLink>
        </div>
      </form>
    </div>
  );
};
