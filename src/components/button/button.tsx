import classes from './button.module.scss';
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

export type ButtonProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type' | 'disabled' | 'onClick' | 'className'> & {
  mode?: 'dark' | 'light';
  'data-testid'?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled,
  mode = 'dark',
  className,
  'data-testid': dataTestId,
}) => {
  const buttonStyle = mode === 'dark' ? classes.buttonDark : classes.buttonLight;

  return (
    <button type={type} className={classNames(classes.button, buttonStyle, className)} onClick={onClick} disabled={disabled} data-testid={dataTestId}>
      {children}
    </button>
  );
};
