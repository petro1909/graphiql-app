import { selectValidRequest } from '@redux/endpointSlice';
import { useGetGraphqlResultQuery } from '@redux/graphqlApi';
import { useSelector } from 'react-redux';
import { BaseEditor } from '../editor/baseEditor/baseEditor';

export function Results() {
  const validRequest = useSelector(selectValidRequest);
  const { data = '', isLoading, isError, error } = useGetGraphqlResultQuery(validRequest, { skip: validRequest.query === '' });

  if (validRequest.query === '') {
    return null;
  }
  if (isLoading) {
    return <div>...Loading</div>;
  }

  const result = isError ? error : data;

  return <BaseEditor initText={JSON.stringify(result, null, '\t')} isDisabled={true} isLinesDisabled={true} />;
}
