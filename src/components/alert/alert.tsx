import classes from './alert.module.scss';
import { closeIcon, warningIcon } from '@assets/index';
import { Button } from '@components/button/button';
import { endShowError } from '@redux/errorSlice';
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
      dispatch(endShowError());
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleClose = () => {
    dispatch(endShowError());
  };

  return (
    <div className={classNames(classes.alert, hasErrorMessage ? classes.show : classes.hide)}>
      <img className={classes.warningIcon} src={warningIcon} />
      <span>{message}</span>
      <Button className={classes.closeButton} onClick={handleClose}>
        <img className={classes.closeImg} src={closeIcon} />
      </Button>
    </div>
  );
};
