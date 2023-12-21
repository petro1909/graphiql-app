import classes from './selectLanguage.module.scss';
import { languages } from '@localization/languages';
import { useLocale } from '@localization/useLocale';

export const SelectLanguage: React.FC = () => {
  const { language, handleChangeLanguage: setLanguage } = useLocale();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setLanguage(e.target.value);
  };

  return (
    <div className={classes.field}>
      <select className={classes.select} name="language" id="language-select" defaultValue={language.name} onChange={onChange}>
        <option value={languages.EN.name}>{language.strings.english}</option>
        <option value={languages.RU.name}>{language.strings.russian}</option>
      </select>
    </div>
  );
};
