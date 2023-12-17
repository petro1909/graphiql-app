import { selectRawRequest, setRawRequest } from '@redux/endpointSlice';
import { store } from '@redux/store';
import { useSelector } from 'react-redux';
import { BaseEditor } from '../baseEditor/baseEditor';
import { Button } from '@components/button/button';
import { useLocale } from '@localization/useLocale';
import { useState } from 'react';
import classes from './queryEditor.module.scss';
import arrowUp from '@assets/arrow-up.svg';
import arrowDown from '@assets/arrow-down.svg';
import classNames from 'classnames';

export function QueryEditor() {
  const { query, headers, variables } = useSelector(selectRawRequest);
  const { language } = useLocale();

  const [isPropertySectionShowed, setIsPropertySectionShowed] = useState(true);
  const [isHeadersSelected, setIsHeadersSelected] = useState(true);

  const handleChangeVars = (updatedVars: string) => {
    setIsPropertySectionShowed(true);
    store.dispatch(setRawRequest({ variables: updatedVars }));
  };

  const handleChangeHeaders = (updatedHeaders: string) => {
    setIsPropertySectionShowed(true);
    store.dispatch(setRawRequest({ headers: updatedHeaders }));
  };

  const handleChangeQuery = (updatedQuery: string) => {
    store.dispatch(setRawRequest({ query: updatedQuery }));
  };

  return (
    <section className={classes.queryWrapper}>
      <section className={classNames(classes.queryEditorWrapper, !isPropertySectionShowed && classes.full)}>
        <BaseEditor initText={query} handleChangeText={handleChangeQuery} />
      </section>
      <section className={classes.queryPropertiesWrapper}>
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
            <img className={classes.toggleButtonImage} src={isPropertySectionShowed ? arrowDown : arrowUp} />
          </div>
        </div>
        <section className={classNames(classes.propertyEditorsWrapper, !isPropertySectionShowed && classes.hidden)}>
          {isHeadersSelected ? (
            <BaseEditor initText={headers} handleChangeText={handleChangeHeaders} />
          ) : (
            <BaseEditor initText={variables} handleChangeText={handleChangeVars} />
          )}
        </section>
      </section>
    </section>
  );
}
