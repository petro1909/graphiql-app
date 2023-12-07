import { InputHTMLAttributes } from 'react';
import classes from './input.module.scss';

type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'placeholder' | 'name' | 'disabled'> & {
  label?: string;
  error?: string;
};

export const Input: React.FC<InputProps> = ({ onChange, name, disabled, value, placeholder, label, error }) => {
  return (
    <div className={classes.field}>
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <input className={classes.input} name={name} disabled={disabled} onChange={onChange} value={value} placeholder={placeholder} />
      <div className={classes.error}>{error}</div>
    </div>
  );
};
