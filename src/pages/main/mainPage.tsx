import { ActionsPanel } from '@components/actionsPanel/actionsPanel';
import { BigSandboxComponent } from '@components/bigSandboxComponent/bigSandboxComponent';
import { Button } from '@components/button/button';
import { DocumentationSection } from '@components/documentationSection/documentationSection';
import { Input } from '@components/input/input';
import { SmallSandboxComponent } from '@components/smallSandboxComponent/smallSandboxComponent';
import { useLocale } from '@localization/useLocale';
import classNames from 'classnames';

import classes from './mainPage.module.scss';

export function MainPage() {
  const { language } = useLocale();

  const placeholder = language.strings.placeholder.endpoint;
  const isDocsShown = false;
  const docBtnStyle = isDocsShown ? classes.documentationBtn : classes.documentationDisabled;

  return (
    <main className={classes.main}>
      <section className={classes.mainTop}>
        <div className={classes.endpoint}>
          <Input placeholder={placeholder} />
          <Button mode="light" className={classes.endpointButton}>
            {language.strings.setEndpoint}
          </Button>
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
