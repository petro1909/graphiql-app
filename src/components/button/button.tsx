import classNames from 'classnames';
import styles from './button.module.scss';

export type ButtonProps = {
  children: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
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
