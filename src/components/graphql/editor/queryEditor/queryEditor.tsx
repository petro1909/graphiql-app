import { selectRawRequest, setRawRequest } from '@redux/endpointSlice';
import { store } from '@redux/store';
import { useSelector } from 'react-redux';
import { BaseEditor } from '../baseEditor/baseEditor';

export function QueryEditor() {
  const { query } = useSelector(selectRawRequest);

  const handleChangeQuery = (updatedQuery: string) => {
    store.dispatch(setRawRequest({ query: updatedQuery }));
  };
  return <BaseEditor initText={query} handleChangeText={handleChangeQuery} />;
}
