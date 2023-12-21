import classes from './auth.module.scss';
import { Button } from '@components/button/button';
import { Input } from '@components/input/input';
import { useLocale } from '@localization/useLocale';
import classNames from 'classnames';
import React, { useState } from 'react';

export const AuthorizationPage: React.FC = () => {
  const { language } = useLocale();

  const [isSignIn, setSignIn] = useState(true);

  const toggleAuthForms = () => {
    setSignIn((prevValue) => !prevValue);
  };

  return (
    <section className={classes.auth}>
      {isSignIn ? (
        <form className={classNames('flex-center', classes.authForm)}>
          <h1 className={classes.title}>{language.strings.signIn}</h1>
          <Input label={language.strings.authEmailLabel} placeholder={language.strings.authEmailPlaceholder} />
          <Input label={language.strings.authPasswordLabel} placeholder={language.strings.authPasswordPlaceholder} />

          <div className={classes.buttonWrapper}>
            <Button>{language.strings.signIn}</Button>
            <Button mode="light" onClick={toggleAuthForms}>
              {language.strings.signUp}
            </Button>
          </div>
        </form>
      ) : (
        <form className={classNames('flex-center', classes.authForm)}>
          <h1 className={classes.title}>{language.strings.signUp}</h1>
          <Input label={language.strings.authNameLabel} placeholder={language.strings.authNamePlaceholder} />
          <Input label={language.strings.authEmailLabel} placeholder={language.strings.authEmailPlaceholder} />
          <Input label={language.strings.authPasswordLabel} placeholder={language.strings.authPasswordPlaceholder} />
          <Input label={language.strings.authConfirmPasswordLabel} placeholder={language.strings.authConfirmPasswordPlaceholder} />
          <div className={classes.buttonWrapper}>
            <Button>{language.strings.signUp}</Button>
            <Button mode="light" onClick={toggleAuthForms}>
              {language.strings.signIn}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};
