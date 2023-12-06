import { useLocale } from '@localization/useLocale';
import styles from './selectLanguage.module.scss';
import { languages } from '@localization/languages';

export const SelectLanguage: React.FC = () => {
  const { language, setLanguage } = useLocale();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setLanguage(e.target.value);
  };

  return (
    <div className={styles.field}>
      <select className={styles.select} name="language" id="language-select" defaultValue={language.name} onChange={onChange}>
        <option value={languages.EN.name}>{languages.EN.title}</option>
        <option value={languages.RU.name}>{languages.RU.title}</option>
      </select>
    </div>
  );
};
