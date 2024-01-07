import classes from './actionsPanel.module.scss';
import { Button } from '@components/button/button';
import { prettify } from '@components/graphql/editor/baseEditor/editorService/prettify';
import { convertHeaders } from '@helpers/utils';
import { playIcon, prettifyIcon } from '@icons/index';
import { useLocale } from '@localization/useLocale';
import { setRawRequest, setValidatedRequest } from '@redux/endpointSlice';
import { useAppDispatch } from '@redux/hooks';
import { selectRawRequest } from '@redux/selectors';
import { useSelector } from 'react-redux';

export const ActionsPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { language } = useLocale();
  const { query, variables, URL } = useSelector(selectRawRequest);

  const headersInStore = useSelector(selectRawRequest).headers;
  const headers = convertHeaders(headersInStore, language.strings.errorMessages.uncorrectHeader);

  const makeRequest = () => {
    dispatch(setValidatedRequest({ query, variables, URL, headers }));
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
