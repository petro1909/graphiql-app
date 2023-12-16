import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import classes from './input.module.scss';

type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'placeholder' | 'name' | 'disabled' | 'className'> & {
  label?: string;
  error?: string;
};

export const Input: React.FC<InputProps> = ({ onChange, name, disabled, value, placeholder, label, error, className }) => {
  return (
    <div className={classes.field}>
      {label && (
        <label className={classes.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={classNames(classes.input, className)}
        name={name}
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      <div className={classes.error}>{error}</div>
    </div>
  );
};
