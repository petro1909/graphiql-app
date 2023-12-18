import { setActiveEntity } from '@redux/docsSlice';
import { selectNext, selectPrev } from '@redux/selectors';
import { historyBack, historyForward } from '@redux/historySlice';
import { store } from '@redux/store';
import { useSelector } from 'react-redux';
import classes from './history.module.scss';
import classNames from 'classnames';

export function History() {
  const prev = useSelector(selectPrev);
  const next = useSelector(selectNext);

  const handleHistoryBack = () => {
    store.dispatch(setActiveEntity(prev));
    store.dispatch(historyBack());
  };
  const handleHistoryForward = () => {
    store.dispatch(setActiveEntity(next));
    store.dispatch(historyForward());
  };

  return (
    <section>
      <div className={classNames(classes.historyItem, classes.itemLeft, !prev && classes.historyDisabled)}>
        <span>{'<'}</span>
        {prev && <span onClick={handleHistoryBack}>{prev.fieldName || prev.typeName}</span>}
      </div>

      <div className={classNames(classes.historyItem, classes.itemRight, !next && classes.historyDisabled)}>
        {next && <span onClick={handleHistoryForward}>{next.fieldName || next.typeName}</span>}
        <span>{'>'}</span>
      </div>
    </section>
  );
}
