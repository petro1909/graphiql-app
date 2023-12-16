import { useSelector } from 'react-redux';
import classes from './documentation.module.scss';
import { selectRawRequest } from '@redux/endpointSlice';
import { useLazyGetGraphqlResultQuery } from '@redux/graphqlApi';
import { store } from '@redux/store';
import { selectActiveEntity, selectSchema, setActiveEntity, setEntities, setSchema, toggleDocsEnable } from '@redux/docsSlice';
import { useEffect, useRef, useState } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { graphqlDocsQuery } from './graphqlDocsQuery';
import { GraphQLResponse, GraphQlSearchInputType } from '@app_types/graphql';
import { AllTypes } from './schema/schema';
import { Button } from '@components/button/button';
import { useLocale } from '@localization/useLocale';
import { AutocompleteSelect } from '@components/graphql/documentation/autocompleteSelect/autocompleteSelect';
import { isGraphQlField, isGraphQlSchema, isGraphQlType } from '@helpers/typeGuards';
import { GraphQlType } from './graphqlEntity/graphqlType';
import { GraphQlField } from './graphqlEntity/graphqlField';
import { History } from './history/history';
import { historyClear, historyPush } from '@redux/historySlice';

export function Documentation() {
  const { language } = useLocale();
  const { URL } = useSelector(selectRawRequest);
  const [getGraphqlResultQuery] = useLazyGetGraphqlResultQuery();

  const [error, setError] = useState<FetchBaseQueryError | SerializedError | undefined>();
  const [loading, setLoading] = useState(false);

  const ref = useRef<HTMLOptionElement>(null);
  const schema = useSelector(selectSchema);
  const activeEntity = useSelector(selectActiveEntity);

  const handleActiveEntity = (searchInput: GraphQlSearchInputType) => {
    ref.current?.scrollTo(0, 0);
    store.dispatch(historyPush(searchInput));
    store.dispatch(setActiveEntity(searchInput));
  };

  useEffect(() => {
    setLoading(true);
    getGraphqlResultQuery({ URL, query: graphqlDocsQuery, variables: '' })
      .then(({ data, error }) => {
        if (error) {
          setError(error);
          store.dispatch(toggleDocsEnable(false));

          return;
        }
        const schema = (data as GraphQLResponse).data.__schema;

        setError(undefined);

        store.dispatch(setSchema(schema));
        store.dispatch(historyClear());
        store.dispatch(historyPush({ typeName: '__Schema' }));
        store.dispatch(setActiveEntity({ typeName: '__Schema' }));
        store.dispatch(setEntities(schema));
        store.dispatch(toggleDocsEnable(true));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [URL]);

  if (loading) {
    return <div>...Loading</div>;
  }
  if (error || !schema || !activeEntity) {
    return null;
  }

  let content: JSX.Element | undefined;
  if (isGraphQlSchema(activeEntity)) {
    content = <AllTypes schema={schema} handleClick={handleActiveEntity} />;
  }
  if (isGraphQlType(activeEntity)) {
    content = <GraphQlType type={activeEntity} handleClick={handleActiveEntity} />;
  }
  if (isGraphQlField(activeEntity)) {
    content = <GraphQlField field={activeEntity} handleClick={handleActiveEntity} />;
  }

  return (
    <section className={classes.docsWrapper}>
      <History />
      <section className={classes.docsHeader}>
        <Button mode="light" className={classes.docsButton} onClick={() => handleActiveEntity({ typeName: '__Schema' })}>
          {language.strings.schema}
        </Button>
        <AutocompleteSelect placeholder={language.strings.searchSchema} handleSelectItem={handleActiveEntity} />
      </section>
      <section className={classes.typesWrapper} ref={ref}>
        {content}
      </section>
    </section>
  );
}
