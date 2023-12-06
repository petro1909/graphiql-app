import styles from './selectLanguage.module.scss';

export const SelectLanguage: React.FC = () => {
  return (
    <div className={styles.field}>
      <select className={styles.select} name="pets" id="pet-select">
        <option value="English" selected>
          English
        </option>
        <option value="Russian">Russian</option>
      </select>
    </div>
  );
};
