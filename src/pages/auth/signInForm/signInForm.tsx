import classes from '../auth.module.scss';
import { SignInFormData } from '@app_types/authForm';
import { Button } from '@components/button/button';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Input } from '@components/input/input';
import { Loader } from '@components/loader/loader';
import { routes } from '@constants/constants';
import { auth } from '@database/context';
import { useLocale } from '@localization/useLocale';
import { showError } from '@redux/errorSlice';
import { SignInFormSchema } from '@utils/signInFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export const SignIn: React.FC = () => {
  const { language } = useLocale();
  const [firebaseError, setFireBaseError] = useState<Error | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: yupResolver(SignInFormSchema()) });

  const [, loading, error] = useAuthState(auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showError(error?.message || firebaseError?.message));
  }, [dispatch, error, firebaseError]);

  const onSubmit = async (data: SignInFormData) => {
    signInWithEmailAndPassword(auth, data.email, data.password).catch((err) => {
      setFireBaseError(err as FirebaseError);
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.wrapperForm} data-testid="sign-in-form">
      <form className={classes.authForm} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.title}>{language.strings.signIn}</h1>
        <Input
          error={errors.email?.message}
          label={language.strings.inputLabel.authEmail}
          placeholder={language.strings.placeholder.authEmail}
          data-testid="email"
          {...register('email')}
        />
        <Input
          error={errors.password?.message}
          label={language.strings.inputLabel.authPassword}
          placeholder={language.strings.placeholder.authPassword}
          type="password"
          data-testid="password"
          {...register('password')}
        />
        <div className={classes.buttonWrapper}>
          <Button data-testid="sign-in-button" type="submit">
            {language.strings.signIn}
          </Button>
          <CustomNavLink to={routes.SIGN_UP}>
            <Button mode="light">{language.strings.signUp}</Button>
          </CustomNavLink>
        </div>
      </form>
    </div>
  );
};
