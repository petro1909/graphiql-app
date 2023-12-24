import classes from './alert.module.scss';
import { Button } from '@components/button/button';
import { closeIcon, warningIcon } from '@icons/index';
import { hideError } from '@redux/errorSlice';
import { showError } from '@redux/selectors';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type AlertProps = {
  message?: string;
};

export const Alert: React.FC<AlertProps> = ({ message }) => {
  const dispatch = useDispatch();

  const hasErrorMessage = useSelector(showError);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideError());
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleClose = () => {
    dispatch(hideError());
  };

  return (
    <div className={classNames(classes.alert, hasErrorMessage ? classes.show : classes.hide)} data-testid="alert-testid">
      <img className={classes.warningIcon} src={warningIcon} />
      <span>{message}</span>
      <Button className={classes.closeButton} onClick={handleClose} data-testid="close-button">
        <img className={classes.closeImg} src={closeIcon} />
      </Button>
    </div>
  );
};
