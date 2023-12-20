import React from 'react';

import classes from './alert.module.scss';

type AlertProps = {
  message?: string;
};

export const Alert: React.FC<AlertProps> = ({ message }) => {
  return (
    <div className={classes.alert}>
      <div>{message}</div>
    </div>
  );
};
