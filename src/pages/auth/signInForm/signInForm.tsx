import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import { useLocale } from '@localization/useLocale';
import { SignInForm } from '@models/authForm';
import { routes } from '@constants/constants';
import { Input } from '@components/input/input';
import { Button } from '@components/button/button';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { useSignInFormSchema } from './useSignInFormSchema';

import classes from '../auth.module.scss';

export const SignIn: React.FC = () => {
  const { language } = useLocale();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted) {
      navigate(routes.MAIN_URL);
    }
  }, [isSubmitted, navigate]);

  const onSubmit: SubmitHandler<SignInForm> = (data) => {
    console.log(data);
    setIsSubmitted(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({ resolver: yupResolver(useSignInFormSchema) });

  return (
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
  );
};
