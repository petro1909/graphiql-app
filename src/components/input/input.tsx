import { forwardRef, InputHTMLAttributes } from 'react';

import classes from './input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ disabled, placeholder, label, error, type, ...props }, ref) => {
  return (
    <div className={classes.field}>
      {label && <label className={classes.label}>{label}</label>}
      <input type={type} disabled={disabled} placeholder={placeholder} ref={ref} {...props} className={classes.input} />
      <div className={classes.error}>{error}</div>
    </div>
  );
});
