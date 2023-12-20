import classes from './button.module.scss';
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

export type ButtonProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type' | 'disabled' | 'onClick' | 'className'> & {
  mode?: 'dark' | 'light';
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', disabled, mode = 'dark', className }) => {
  const buttonStyle = mode === 'dark' ? classes.buttonDark : classes.buttonLight;

  return (
    <button type={type} className={classNames(classes.button, buttonStyle, className)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
