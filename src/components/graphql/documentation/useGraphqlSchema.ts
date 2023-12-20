import { __Schema } from '@app_types/graphql';
import { setSchema, setActiveEntity, setEntities } from '@redux/docsSlice';
import { historyClear, historyPush } from '@redux/historySlice';
import { useAppDispatch } from '@redux/hooks';

export function useGraphQlSchema() {
  const dispatch = useAppDispatch();
  const initSchema = (schema: __Schema) => {
    dispatch(historyClear());
    dispatch(historyPush({ typeName: '__Schema' }));

    dispatch(setSchema(schema));
    dispatch(setActiveEntity({ typeName: '__Schema' }));

    dispatch(setEntities(schema));
  };

  return initSchema;
}
