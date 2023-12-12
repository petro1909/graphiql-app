import { Button } from '@components/button/button';
import classes from './actionsPanel.module.scss';
import playIcon from '@assets/play.svg';
import prettifyInon from '@assets/prettify.svg';
import { store } from '@redux/store';
import { selectRawRequest, setRawRequest, setValidatedRequest } from '@redux/endpointSlice';
import { useSelector } from 'react-redux';
import { prettify } from '../editor/baseEditor/editorService/prettify';

export const ActionsPanel: React.FC = () => {
  const { query, variables, URL } = useSelector(selectRawRequest);
  const makeRequest = () => {
    store.dispatch(setValidatedRequest({ query, variables, URL }));
  };

  const prettifyQuery = () => {
    store.dispatch(setRawRequest({ query: prettify(query), variables: prettify(variables) }));
  };

  return (
    <aside className={classes.actions}>
      <Button mode="light" additionalClass={classes.actionButton} onClick={makeRequest}>
        <img title="make request" src={playIcon} alt="make request" />
      </Button>
      <Button mode="light" additionalClass={classes.actionButton} onClick={prettifyQuery}>
        <img title="prettify" src={prettifyInon} alt="prettify" />
      </Button>
    </aside>
  );
};
