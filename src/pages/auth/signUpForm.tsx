import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import { useLocale } from '@localization/useLocale';
import { SignUpFormData } from '@app_types/authForm';
import { routes } from '@constants/constants';
import { Input } from '@components/input/input';
import { Button } from '@components/button/button';
import { CustomNavLink } from '@components/customNavLink/customNavLink';

import classes from './auth.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@dataBase/initialApp';
import { Alert } from '@components/alert/alert';
import useSignUp from '@hooks/useSignUp';

export const SignUp: React.FC = () => {
  const { language } = useLocale();
  const navigate = useNavigate();
  const { signUp } = useSignUp();

  const useSignUpFormSchema = Yup.object().shape({
    name: Yup.string()
      .max(20, language.strings.errorMessageNameLong)
      .matches(/^[A-Z]/, language.strings.errorMessageNameFirstLetter)
      .required(language.strings.errorMessageNameRequired),
    email: Yup.string().email(language.strings.errorMessageEmailNotValid).required(language.strings.errorMessageEmailRequired),
    password: Yup.string()
      .min(8, language.strings.errorMessagePasswordRequired)
      .max(32)
      .required(language.strings.errorMessagePasswordRequired)
      .matches(/[0-9]/, language.strings.errorMessagePasswordDigit)
      .matches(/[a-z]/, language.strings.errorMessagePasswordLowercase)
      .matches(/[A-Z]/, language.strings.errorMessagePasswordUppercase)
      .matches(/[^\w ]/g, language.strings.errorMessagePasswordSymbol),
    confirmPassword: Yup.string()
      .required(language.strings.errorMessageConfirmPassword)
      .oneOf([Yup.ref('password')], language.strings.errorMessagePasswordMatch),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: yupResolver(useSignUpFormSchema) });

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate(routes.MAIN_URL);
    }
  }, [user, navigate]);

  const onSubmit = async (data: SignUpFormData) => {
    await signUp(data.email, data.password, data.name);
  };

  if (loading) {
    return <p>Loading...</p>; //TODO: change to <Loader>
  }

  return (
    <form className={classNames('flex-center', classes.authForm)} onSubmit={handleSubmit(onSubmit)}>
      {error && <Alert message={error.message} />}
      <h1 className={classes.title}>{language.strings.signUp}</h1>
      <Input
        error={errors.name?.message}
        label={language.strings.authNameLabel}
        placeholder={language.strings.authNamePlaceholder}
        {...register('name')}
      />
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
        type="password"
        {...register('password')}
      />
      <Input
        error={errors.confirmPassword?.message}
        label={language.strings.authConfirmPasswordLabel}
        placeholder={language.strings.authConfirmPasswordPlaceholder}
        type="password"
        {...register('confirmPassword')}
      />
      <div className={classes.buttonWrapper}>
        <Button type="submit">{language.strings.signUp}</Button>
        <CustomNavLink to={routes.SIGN_IN}>
          <Button mode="light">{language.strings.signIn}</Button>
        </CustomNavLink>
      </div>
    </form>
  );
};
