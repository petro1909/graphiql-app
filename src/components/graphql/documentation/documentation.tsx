import { useSelector } from 'react-redux';
import classes from './documentation.module.scss';
import { selectRawRequest, selectActiveEntity, selectSchema } from '@redux/selectors';
import { useLazyGetGraphqlResultQuery } from '@redux/graphqlApi';
import { useAppDispatch } from '@redux/hooks';
import { setActiveEntity, toggleDocsEnable } from '@redux/docsSlice';
import { useEffect, useRef, useState } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { graphqlDocsQuery } from './graphqlDocsQuery';
import { GraphQLResponse, GraphQlSearchInputType } from '@app_types/graphql';
import { Button } from '@components/button/button';
import { useLocale } from '@localization/useLocale';
import { AutocompleteSelect } from '@components/graphql/documentation/autocompleteSelect/autocompleteSelect';
import { History } from './history/history';
import { historyPush } from '@redux/historySlice';
import { Loader } from '@components/loader/loader';
import { useGraphQlSchema } from './useGraphqlSchema';
import { DocumentationContent } from './documentationContent';

export function Documentation() {
  const dispatch = useAppDispatch();
  const { language } = useLocale();
  const { URL } = useSelector(selectRawRequest);
  const [getGraphqlResultQuery] = useLazyGetGraphqlResultQuery();

  const [error, setError] = useState<FetchBaseQueryError | SerializedError | null>(null);
  const [loading, setLoading] = useState(false);

  const ref = useRef<HTMLOptionElement>(null);
  const schema = useSelector(selectSchema);
  const activeEntity = useSelector(selectActiveEntity);

  const initSchema = useGraphQlSchema();

  const handleActiveEntity = (searchInput: GraphQlSearchInputType) => {
    ref.current?.scrollTo(0, 0);
    dispatch(historyPush(searchInput));
    dispatch(setActiveEntity(searchInput));
  };

  useEffect(() => {
    setLoading(true);
    getGraphqlResultQuery({ URL, query: graphqlDocsQuery, variables: '' })
      .then(({ data, error }) => {
        if (error) {
          setError(error);
          dispatch(toggleDocsEnable(false));
        } else {
          setError(null);
          const schema = (data as GraphQLResponse).data.__schema;
          initSchema(schema);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [URL]);

  if (loading) {
    return <Loader />;
  }
  if (error || !schema || !activeEntity) {
    return null;
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
        <DocumentationContent activeEntity={activeEntity} handleActiveEntity={handleActiveEntity} />
      </section>
    </section>
  );
}
