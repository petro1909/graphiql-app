import classes from './queryEditor.module.scss';
import { BaseEditor } from '../baseEditor/baseEditor';
import { Button } from '@components/button/button';
import { arrowUpIcon, arrowDownIcon } from '@icons/index';
import { useLocale } from '@localization/useLocale';
import { setRawRequest } from '@redux/endpointSlice';
import { useAppDispatch } from '@redux/hooks';
import { selectRawRequest } from '@redux/selectors';
import { classNames } from '@utils/classNames';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export function QueryEditor() {
  const dispatch = useAppDispatch();
  const { query, headers, variables } = useSelector(selectRawRequest);
  const { language } = useLocale();

  const [isPropertySectionShowed, setIsPropertySectionShowed] = useState(true);
  const [isHeadersSelected, setIsHeadersSelected] = useState(true);

  const handleChangeVars = (updatedVars: string) => {
    setIsPropertySectionShowed(true);
    dispatch(setRawRequest({ variables: updatedVars }));
  };

  const handleChangeHeaders = (updatedHeaders: string) => {
    setIsPropertySectionShowed(true);
    dispatch(setRawRequest({ headers: updatedHeaders }));
  };

  const handleChangeQuery = (updatedQuery: string) => {
    dispatch(setRawRequest({ query: updatedQuery }));
  };

  return (
    <div className={classes.queryWrapper}>
      <section className={classNames(classes.queryEditorWrapper, !isPropertySectionShowed && classes.full)}>
        <h4 className={classes.hiddenSectionHeader}>{language.strings.queryEditorTitle}</h4>
        <BaseEditor initText={query} handleChangeText={handleChangeQuery} />
      </section>
      <section className={classes.queryPropertiesWrapper}>
        <h4 className={classes.hiddenSectionHeader}>{language.strings.headersTitle}</h4>
        <div className={classes.queryPropertiesActions}>
          <div>
            <Button mode="light" onClick={() => setIsHeadersSelected(true)}>
              {language.strings.headers}
            </Button>
            <Button mode="light" onClick={() => setIsHeadersSelected(false)}>
              {language.strings.variables}
            </Button>
          </div>
          <div className={classes.toggleButton} onClick={() => setIsPropertySectionShowed(!isPropertySectionShowed)}>
            <img className={classes.toggleButtonImage} src={isPropertySectionShowed ? arrowDownIcon : arrowUpIcon} />
          </div>
        </div>
        <div className={classNames(classes.propertyEditorsWrapper, !isPropertySectionShowed && classes.hidden)}>
          {isHeadersSelected ? (
            <BaseEditor initText={headers} handleChangeText={handleChangeHeaders} />
          ) : (
            <BaseEditor initText={variables} handleChangeText={handleChangeVars} />
          )}
        </div>
      </section>
    </div>
  );
}
