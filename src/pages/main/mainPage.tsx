import { useLocale } from '@localization/useLocale';
import { Input } from '@components/input/input';
import { Button } from '@components/button/button';
import { ActionsPanel } from '@components/actionsPanel/actionsPanel';
import { BigSandboxComponent } from '@components/bigSandboxComponent/bigSandboxComponent';
import { DocumentationSection } from '@components/documentationSection/documentationSection';
import { SmallSandboxComponent } from '@components/smallSandboxComponent/smallSandboxComponent';
import classes from './mainPage.module.scss';
import classNames from 'classnames';

export function MainPage() {
  const { language } = useLocale();
  const placeholder = language.strings.endpointPlaceholder;
  const isDocsShown = false;
  const docBtnStyle = isDocsShown ? classes.documentationBtn : classes.documentationDisabled;
  return (
    <main className={classes.main}>
      <section className={classes.mainTop}>
        <div className={classes.endpoint}>
          <Input placeholder={placeholder} />
          <Button mode="light">{language.strings.setEndpoint}</Button>
        </div>
        <div className={docBtnStyle}>{language.strings.doc}</div>
      </section>
      <section className={classNames(classes.sandBox, isDocsShown && classes.visibleDocs)}>
        <ActionsPanel />
        <BigSandboxComponent />
        <BigSandboxComponent />
        <DocumentationSection />
        <SmallSandboxComponent />
        <SmallSandboxComponent />
      </section>
    </main>
  );
}
