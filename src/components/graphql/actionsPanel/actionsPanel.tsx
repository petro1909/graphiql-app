import { Button } from '@components/button/button';
import classes from './actionsPanel.module.scss';
import { playIcon } from '@assets/index';
import { prettifyIcon } from '@assets/index';
import { useAppDispatch } from '@redux/hooks';
import { selectRawRequest } from '@redux/selectors';
import { setRawRequest, setValidatedRequest } from '@redux/endpointSlice';
import { useSelector } from 'react-redux';
import { prettify } from '../editor/baseEditor/editorService/prettify';
import { useLocale } from '@localization/useLocale';

export const ActionsPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { language } = useLocale();
  const { query, variables, URL } = useSelector(selectRawRequest);
  const makeRequest = () => {
    dispatch(setValidatedRequest({ query, variables, URL }));
  };

  const prettifyQuery = () => {
    dispatch(setRawRequest({ query: prettify(query), variables: prettify(variables) }));
  };

  return (
    <aside className={classes.actions}>
      <Button mode="light" className={classes.actionButton} onClick={makeRequest}>
        <img className={classes.image} title={language.strings.makeRequest} src={playIcon} alt="make request" />
      </Button>
      <Button mode="light" className={classes.actionButton} onClick={prettifyQuery}>
        <img className={classes.image} title={language.strings.prettify} src={prettifyIcon} alt="prettify" />
      </Button>
    </aside>
  );
};
