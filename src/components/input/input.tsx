import { forwardRef } from 'react';
import classes from './input.module.scss';

type InputProps = {
  label?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ disabled, value, placeholder, label, error, ...props }, ref) => {
  return (
    <div className={classes.field}>
      {label && <label className={classes.label}>{label}</label>}
      <input className={classes.input} disabled={disabled} value={value} placeholder={placeholder} ref={ref} {...props} />
      <div className={classes.error}>{error}</div>
    </div>
  );
});
