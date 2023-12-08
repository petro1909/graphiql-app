import { useLocale } from '@localization/useLocale';
import { Input } from '@components/input/input';
import { Button } from '@components/button/button';
import classes from './mainPage.module.scss';

export function MainPage() {
  const { language } = useLocale();
  const placeholder = language.strings.endpointPlaceholder;
  const isDisabled = true;
  const docBtnStyle = isDisabled ? classes.documentationDisabled : classes.documentationBtn;
  return (
    <main className={classes.main}>
      <section className={classes.mainTop}>
        <div className={classes.endpoint}>
          <Input placeholder={placeholder}></Input>
          <Button mode="light">{language.strings.setEndpoint}</Button>
        </div>
        <div className={docBtnStyle} data-disabled={isDisabled}>
          {language.strings.doc}
        </div>
      </section>
      <section className={classes.mainContent}>
        <section className={classes.sandBox}>
          <aside className={classes.actions}>actions</aside>
          <div className={classes.sandBoxRequest}>Query editor / JSON viewer</div>
          <div className={classes.sandBoxResponce}>Response section</div>
          <div className={classes.documentationContent}>Documentation content</div>
          <div className={classes.sandBoxVars}>Variables editor section</div>
          <div className={classes.sandBoxJson}>Headers editor section</div>
        </section>
      </section>
    </main>
  );
}
