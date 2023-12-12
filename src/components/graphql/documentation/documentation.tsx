import { useSelector } from 'react-redux';
import classes from './documentation.module.scss';
import classNames from 'classnames';
import { selectRawRequest } from '@redux/endpointSlice';
import { useLazyGetGraphqlResultQuery } from '@redux/graphqlApi';
import { store } from '@redux/store';
import { toggleDocsEnable } from '@redux/docsSlice';
import { useEffect, useState } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { graphqlDocsQuery } from './graphqlDocsQuery';
import { GraphQLResponse, __Schema, __Type } from '@app_types/graphql';
import { AllTypes } from './allTypes/allTypes';
import { SingleType } from './singleType/singleTypes';
import { Button } from '@components/button/button';
import { useLocale } from '@localization/useLocale';

export function Documentation() {
  const { language } = useLocale();
  const { URL } = useSelector(selectRawRequest);
  const [getGraphqlResultQuery] = useLazyGetGraphqlResultQuery();
  const [schema, setSchema] = useState<__Schema | undefined>();
  const [error, setError] = useState<FetchBaseQueryError | SerializedError | undefined>();
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState<__Type | undefined>();

  const handleChangeActiveType = (typeName?: string) => {
    if (!typeName) {
      setActiveType(undefined);
    }
    setActiveType(schema?.types.find((type) => type.name === typeName));
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
        setSchema(schema);
        store.dispatch(toggleDocsEnable(true));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [URL]);

  if (loading) {
    return <div>...Loading</div>;
  }
  if (error || !schema) {
    return null;
  }
  return (
    <section className={classNames(classes.documentationContent)}>
      <Button mode="light" onClick={() => handleChangeActiveType()}>
        {language.strings.schema}
      </Button>
      {activeType ? <SingleType type={activeType} onClick={handleChangeActiveType} /> : <AllTypes schema={schema} onClick={handleChangeActiveType} />}
    </section>
  );
}
