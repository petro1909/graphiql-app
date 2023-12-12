import { selectRawRequest, setRawRequest } from '@redux/endpointSlice';
import { store } from '@redux/store';
import { useSelector } from 'react-redux';
import { BaseEditor } from '../baseEditor/baseEditor';

export function VarsEditor() {
  const { variables } = useSelector(selectRawRequest);

  const handleChangeVars = (updatedVars: string) => {
    store.dispatch(setRawRequest({ variables: updatedVars }));
  };
  return <BaseEditor initText={variables} handleChangeText={handleChangeVars} />;
}
