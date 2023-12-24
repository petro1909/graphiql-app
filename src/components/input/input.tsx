import classes from './input.module.scss';
import classNames from 'classnames';
import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  'data-testid'?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, placeholder, label, error, type, className, 'data-testid': dataTestId, ...props }, ref) => {
    return (
      <div className={classes.field} data-testid={dataTestId}>
        {label && <label className={classes.label}>{label}</label>}
        <input type={type} disabled={disabled} placeholder={placeholder} ref={ref} {...props} className={classNames(classes.input, className)} />
        {error && (
          <div className={classes.error} data-testid="error-message">
            {error}
          </div>
        )}
      </div>
    );
  }
);
