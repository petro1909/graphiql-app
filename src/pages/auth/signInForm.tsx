import classes from './auth.module.scss';
import { SignInFormData } from '@app_types/authForm';
import { Button } from '@components/button/button';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Input } from '@components/input/input';
import { Loader } from '@components/loader/loader';
import { routes } from '@constants/constants';
import { auth } from '@database/context';
import { useLocale } from '@localization/useLocale';
import { showError } from '@redux/errorSlice';
import { useSignInFormSchema } from '@utils/useSignInFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export const SignIn: React.FC = () => {
  const { language } = useLocale();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: yupResolver(useSignInFormSchema()) });

  const [, loading, error] = useAuthState(auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showError(error?.message));
  }, [dispatch, error]);

  const onSubmit = async (data: SignInFormData) => {
    signInWithEmailAndPassword(auth, data.email, data.password);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.wrapperForm}>
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
