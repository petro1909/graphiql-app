import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import { useLocale } from '@localization/useLocale';
import { SignUpForm } from '@app_types/authForm';
import { routes } from '@constants/constants';
import { Input } from '@components/input/input';
import { Button } from '@components/button/button';
import { useSignUpFormSchema } from './useSignUpFormSchema';
import { CustomNavLink } from '@components/customNavLink/customNavLink';

import classes from '../auth.module.scss';

export const SignUp: React.FC = () => {
  const { language } = useLocale();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted) {
      navigate(routes.MAIN_URL);
    }
  }, [isSubmitted, navigate]);

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    console.log(data);
    setIsSubmitted(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({ resolver: yupResolver(useSignUpFormSchema) });

  return (
    <form className={classNames('flex-center', classes.authForm)} onSubmit={handleSubmit(onSubmit)}>
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
        {...register('password')}
      />
      <Input
        error={errors.confirmPassword?.message}
        label={language.strings.authConfirmPasswordLabel}
        placeholder={language.strings.authConfirmPasswordPlaceholder}
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
