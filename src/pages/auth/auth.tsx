import React from 'react';
import { useLocale } from '@localization/useLocale';

import { Input } from '@components/input/input';
import { Button } from '@components/button/button';

import classes from './auth.module.scss';
import classNames from 'classnames';

export const AuthorizationPage: React.FC = () => {
  const { language } = useLocale();

  return (
    <section className={classes.auth}>
      <form className={classNames('flex-center', classes.authForm)}>
        <h1 className={classes.title}>GraphiQL</h1>
        <Input label={language.strings.authEmailLabel} placeholder="Email" />
        <Input label={language.strings.authPasswordLabel} placeholder="Password" />

        <Button>{language.strings.signIn}</Button>
      </form>
    </section>
  );
};
