import styles from './selectLanguage.module.scss';

export const SelectLanguage: React.FC = () => {
  return (
    <div className={styles.field}>
      <select className={styles.select} name="language" id="language-select" defaultValue="English">
        <option value="English">English</option>
        <option value="Russian">Russian</option>
      </select>
    </div>
  );
};
