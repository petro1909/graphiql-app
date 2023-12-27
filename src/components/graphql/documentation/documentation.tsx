import classes from './documentation.module.scss';
import { DocumentationContent } from './documentationContent';
import { graphqlDocsQuery } from './graphqlDocsQuery';
import { History } from './history/history';
import { useGraphQlSchema } from './useGraphqlSchema';
import { GraphQLResponse, GraphQlSearchInputType } from '@app_types/graphql';
import { Button } from '@components/button/button';
import { AutocompleteSelect } from '@components/graphql/documentation/autocompleteSelect/autocompleteSelect';
import { Loader } from '@components/loader/loader';
import { useLocale } from '@localization/useLocale';
import { setActiveEntity, toggleDocsEnable } from '@redux/docsSlice';
import { useLazyGetGraphqlResultQuery } from '@redux/graphqlApi';
import { historyPush } from '@redux/historySlice';
import { useAppDispatch } from '@redux/hooks';
import { selectRawRequest, selectActiveEntity, selectSchema } from '@redux/selectors';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

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
    <div className={classes.docsWrapper}>
      <History />
      <div className={classes.docsHeader}>
        <Button mode="light" className={classes.docsButton} onClick={() => handleActiveEntity({ typeName: '__Schema' })}>
          {language.strings.schema}
        </Button>
        <AutocompleteSelect placeholder={language.strings.searchSchema} handleSelectItem={handleActiveEntity} />
      </div>
      <div className={classes.typesWrapper} ref={ref}>
        <DocumentationContent activeEntity={activeEntity} handleActiveEntity={handleActiveEntity} />
      </div>
    </div>
  );
}
