import { selectRawRequest, setRawRequest } from '@redux/endpointSlice';
import { store } from '@redux/store';
import { useSelector } from 'react-redux';
import { BaseEditor } from '../baseEditor/baseEditor';

export function HeadersEditor() {
  const { headers } = useSelector(selectRawRequest);

  const handleChangeHeaders = (updatedHeaders: string) => {
    store.dispatch(setRawRequest({ headers: updatedHeaders }));
  };
  return <BaseEditor initText={headers} handleChangeText={handleChangeHeaders} />;
}
