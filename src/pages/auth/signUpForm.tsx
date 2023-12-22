import classes from './auth.module.scss';
import { useSignUpFormSchema } from '../../utils/useSignUpFormSchema';
import { SignUpFormData } from '@app_types/authForm';
import { Alert } from '@components/alert/alert';
import { Button } from '@components/button/button';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Input } from '@components/input/input';
import { Loader } from '@components/loader/loader';
import { routes } from '@constants/constants';
import { auth } from '@dataBase/initialApp';
import useSignUp from '@hooks/useSignUp';
import { useLocale } from '@localization/useLocale';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';

export const SignUp: React.FC = () => {
  const { language } = useLocale();
  const { signUp } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: yupResolver(useSignUpFormSchema()) });

  const [, loading, error] = useAuthState(auth);

  const onSubmit = async (data: SignUpFormData) => {
    signUp(data.email, data.password, data.name);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.wrapperForm}>
      {!error && <Alert message={'error.message'} />}
      <form className={classNames('flex-center', classes.authForm)} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.title}>{language.strings.signUp}</h1>
        <Input
          error={errors.name?.message}
          label={language.strings.inputLabel.authName}
          placeholder={language.strings.placeholder.authName}
          {...register('name')}
        />
        <Input
          error={errors.email?.message}
          label={language.strings.inputLabel.authEmail}
          placeholder={language.strings.placeholder.authEmail}
          {...register('email')}
        />
        <Input
          error={errors.password?.message}
          label={language.strings.inputLabel.authPassword}
          placeholder={language.strings.placeholder.authPassword}
          type="password"
          {...register('password')}
        />
        <Input
          error={errors.confirmPassword?.message}
          label={language.strings.inputLabel.authConfirmPassword}
          placeholder={language.strings.placeholder.authConfirmPassword}
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
    </div>
  );
};
