import { SignInFormData } from '@app_types/authForm';
import { Alert } from '@components/alert/alert';
import { Button } from '@components/button/button';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Input } from '@components/input/input';
import { routes } from '@constants/constants';
import { auth } from '@dataBase/initialApp';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocale } from '@localization/useLocale';
import { useSignInFormSchema } from '@utils/useSignInFormSchema';
import classNames from 'classnames';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import classes from './auth.module.scss';

export const SignIn: React.FC = () => {
  const { language } = useLocale();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: yupResolver(useSignInFormSchema()) });

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate(routes.MAIN_URL);
    }
  }, [user, navigate]);

  const onSubmit = async (data: SignInFormData) => {
    signInWithEmailAndPassword(auth, data.email, data.password);
  };

  if (loading) {
    return <p>Loading...</p>; //TODO: change to <Loader>
  }

  return (
    <div className={classes.wrapperForm}>
      {error && <Alert message={error.message} />}
      <form className={classNames('flex-center', classes.authForm)} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.title}>{language.strings.signIn}</h1>
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
