import classes from './input.module.scss';
import classNames from 'classnames';
import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ disabled, placeholder, label, error, type, className, ...props }, ref) => {
  return (
    <div className={classes.field}>
      {label && <label className={classes.label}>{label}</label>}
      <input type={type} disabled={disabled} placeholder={placeholder} ref={ref} {...props} className={classNames(classes.input, className)} />
      <div className={classes.error}>{error}</div>
    </div>
  );
});
