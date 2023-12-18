import { __Schema } from '@app_types/graphql';
import { setSchema, setActiveEntity, setEntities } from '@redux/docsSlice';
import { historyClear, historyPush } from '@redux/historySlice';
import { store } from '@redux/store';

export function useGraphQlSchema() {
  const initSchema = (schema: __Schema) => {
    store.dispatch(historyClear());
    store.dispatch(historyPush({ typeName: '__Schema' }));

    store.dispatch(setSchema(schema));
    store.dispatch(setActiveEntity({ typeName: '__Schema' }));

    store.dispatch(setEntities(schema));
  };

  return initSchema;
}
