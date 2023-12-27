import classes from './mainPage.module.scss';
import { Button } from '@components/button/button';
import { ActionsPanel } from '@components/graphql/actionsPanel/actionsPanel';
import { Documentation } from '@components/graphql/documentation/documentation';

import { QueryEditor } from '@components/graphql/editor/queryEditor/queryEditor';
import { EndpointForm } from '@components/graphql/endPointForm/endPointForm';
import { Results } from '@components/graphql/results/results';
import { Header } from '@components/header/header';
import { SandboxContainer } from '@components/sandboxContainer/sandboxContainer';
import { useLocale } from '@localization/useLocale';
import { selectDocsEnable } from '@redux/selectors';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function MainPage() {
  const { language } = useLocale();
  const isDocsEnable = useSelector(selectDocsEnable);

  const [docsVisibility, setDocsVisibility] = useState(isDocsEnable);

  useEffect(() => {
    setDocsVisibility(isDocsEnable);
  }, [isDocsEnable]);

  return (
    <>
      <Header />
      <main className={classes.main}>
        <section className={classes.mainTop}>
          <h4 className={classes.hiddenSectionHeader}>endpoint setter and documentation button</h4>
          <EndpointForm />
          <Button disabled={!isDocsEnable} onClick={() => setDocsVisibility(!docsVisibility)}>
            {language.strings.docShowButton}
          </Button>
        </section>
        <section className={classes.sandBox}>
          <h4 className={classNames(classes.hiddenSectionHeader, classes.mainHeader)}>sandbox</h4>
          <section className={classes.actionsGridWrapper}>
            <h4 className={classes.hiddenSectionHeader}>actions</h4>
            <SandboxContainer>
              <ActionsPanel />
            </SandboxContainer>
          </section>
          <section className={classes.queryGridWrapper}>
            <h4 className={classes.hiddenSectionHeader}>query</h4>
            <SandboxContainer>
              <QueryEditor />
            </SandboxContainer>
          </section>
          <section className={classNames(classes.resultsGridWrapper)}>
            <h4 className={classes.hiddenSectionHeader}>results</h4>
            <SandboxContainer>
              <Results />
            </SandboxContainer>
          </section>
          <section className={classNames(classes.docsGridWrapper, !docsVisibility && classes.docsHidden)}>
            <h4 className={classes.hiddenSectionHeader}>documentation</h4>
            <SandboxContainer>
              <Documentation />
            </SandboxContainer>
          </section>
        </section>
      </main>
    </>
  );
}
