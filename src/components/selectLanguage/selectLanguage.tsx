import { useLocale } from '@localization/useLocale';
import { languages } from '@localization/languages';

import classes from './selectLanguage.module.scss';

export const SelectLanguage: React.FC = () => {
  const { language, handleChangeLanguage: setLanguage } = useLocale();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setLanguage(e.target.value);
  };

  return (
    <div className={classes.field}>
      <select className={classes.select} name="language" id="language-select" defaultValue={language.name} onChange={onChange}>
        <option value={languages.EN.name}>{language.strings.English}</option>
        <option value={languages.RU.name}>{language.strings.Russian}</option>
      </select>
    </div>
  );
};
