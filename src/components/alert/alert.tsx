import classes from './alert.module.scss';
import { closeIcon, warningIcon } from '@assets/index';
import { Button } from '@components/button/button';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type AlertProps = {
  message?: string;
};

export const Alert: React.FC<AlertProps> = ({ message }) => {
  const [showAlert, setShowAlert] = useState<boolean>(true);

  const handleClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classNames(classes.alert, showAlert ? classes.show : classes.hide)}>
      <img className={classes.warningIcon} src={warningIcon} />
      <span>{message}</span>
      <Button className={classes.closeButton} onClick={handleClose}>
        <img className={classes.closeImg} src={closeIcon} />
      </Button>
    </div>
  );
};
