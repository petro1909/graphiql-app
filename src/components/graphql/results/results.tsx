import { selectValidRequest } from '@redux/selectors';
import { useGetGraphqlResultQuery } from '@redux/graphqlApi';
import { useSelector } from 'react-redux';
import { BaseEditor } from '../editor/baseEditor/baseEditor';
import classes from './results.module.scss';
import { Loader } from '@components/loader/loader';

export function Results() {
  const validRequest = useSelector(selectValidRequest);
  const { data = '', isLoading, isError, error } = useGetGraphqlResultQuery(validRequest, { skip: validRequest.query === '' });

  if (validRequest.query === '') {
    return null;
  }
  if (isLoading) {
    return <Loader />;
  }

  const result = isError ? error : data;

  return (
    <section className={classes.resultsWrapper}>
      <BaseEditor initText={JSON.stringify(result, null, '\t')} isDisabled={true} isLinesDisabled={true} />
    </section>
  );
}
