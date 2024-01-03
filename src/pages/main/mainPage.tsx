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
          <EndpointForm />
          <Button disabled={!isDocsEnable} onClick={() => setDocsVisibility(!docsVisibility)}>
            {language.strings.docShowButton}
          </Button>
        </section>
        <section className={classes.sandBox}>
          <section className={classNames(classes.actionsGridWrapper)}>
            <SandboxContainer>
              <ActionsPanel />
            </SandboxContainer>
          </section>
          <section className={classNames(classes.queryGridWrapper)}>
            <SandboxContainer>
              <QueryEditor />
            </SandboxContainer>
          </section>
          <section className={classNames(classes.resultsGridWrapper)}>
            <SandboxContainer>
              <Results />
            </SandboxContainer>
          </section>
          <section className={classNames(classes.docsGridWrapper, !docsVisibility && classes.docsHidden)}>
            <SandboxContainer>
              <Documentation />
            </SandboxContainer>
          </section>
        </section>
      </main>
    </>
  );
}
