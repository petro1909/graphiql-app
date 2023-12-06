import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';

export type ButtonProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type' | 'disabled' | 'onClick'> & {
  mode?: 'dark' | 'light';
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', disabled, mode = 'dark' }) => {
  const buttonStyle = mode === 'dark' ? styles.buttonDark : styles.buttonLight;
  return (
    <button type={type} className={classNames(styles.button, buttonStyle)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
