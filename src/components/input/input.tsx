import styles from './input.module.scss';

type InputProps = {
  name?: string;
  onChange?: () => void;
  value?: string | number;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
};

export const Input: React.FC<InputProps> = ({ onChange, name, disabled, value, placeholder, label, error }) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input className={styles.input} name={name} disabled={disabled} onChange={onChange} value={value} placeholder={placeholder} />
      <div className={styles.error}>{error}</div>
    </div>
  );
};
