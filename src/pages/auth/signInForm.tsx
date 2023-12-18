import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import classNames from 'classnames';
import * as Yup from 'yup';

import { auth } from '@dataBase/initialApp';
import { Alert } from '@components/alert/alert';
import { useLocale } from '@localization/useLocale';
import { SignInFormData } from '@app_types/authForm';
import { routes } from '@constants/constants';
import { Input } from '@components/input/input';
import { Button } from '@components/button/button';
import { CustomNavLink } from '@components/customNavLink/customNavLink';

import classes from './auth.module.scss';

export const SignIn: React.FC = () => {
  const { language } = useLocale();
  const navigate = useNavigate();

  const useSignInFormSchema = Yup.object().shape({
    email: Yup.string().email(language.strings.errorMessageEmailNotValid).required(language.strings.errorMessageEmailRequired),
    password: Yup.string()
      .min(6, language.strings.errorMessagePasswordRequired)
      .max(32)
      .required(language.strings.errorMessagePasswordRequired)
      .matches(/[0-9]/, language.strings.errorMessagePasswordDigit)
      .matches(/[a-z]/, language.strings.errorMessagePasswordLowercase)
      .matches(/[A-Z]/, language.strings.errorMessagePasswordUppercase)
      .matches(/[^\w ]/g, language.strings.errorMessagePasswordSymbol),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: yupResolver(useSignInFormSchema) });

  const [user, loading, error] = useAuthState(auth);

  const onSubmit = async (data: SignInFormData) => {
    //await createUserWithEmailAndPassword(auth, data.email, data.password);
    await signInWithEmailAndPassword(auth, data.email, data.password);
  };

  if (loading) {
    return <p>Loading...</p>; //change to <Loader>
  }
  if (user) {
    navigate(routes.MAIN_URL);
  }
  return (
    <div className={classes.wrapperForm}>
      {error && <Alert message={error.message} />}
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
