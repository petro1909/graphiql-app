import classes from './alert.module.scss';
import React from 'react';

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
