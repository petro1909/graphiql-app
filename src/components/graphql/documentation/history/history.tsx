import classes from './history.module.scss';
import { setActiveEntity } from '@redux/docsSlice';
import { historyBack, historyForward } from '@redux/historySlice';
import { useAppDispatch } from '@redux/hooks';
import { selectNext, selectPrev } from '@redux/selectors';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

export function History() {
  const dispatch = useAppDispatch();
  const prev = useSelector(selectPrev);
  const next = useSelector(selectNext);

  const handleHistoryBack = () => {
    dispatch(setActiveEntity(prev));
    dispatch(historyBack());
  };
  const handleHistoryForward = () => {
    dispatch(setActiveEntity(next));
    dispatch(historyForward());
  };

  return (
    <section>
      <div className={classNames(classes.historyItem, classes.itemLeft, !prev && classes.historyDisabled)}>
        <button onClick={handleHistoryBack} className={classNames(classes.btnPrev, classes.btnHistory)}></button>
        {prev && <span onClick={handleHistoryBack}>{prev.fieldName || prev.typeName}</span>}
      </div>

      <div className={classNames(classes.historyItem, classes.itemRight, !next && classes.historyDisabled)}>
        {next && <span onClick={handleHistoryForward}>{next.fieldName || next.typeName}</span>}
        <button onClick={handleHistoryForward} className={classNames(classes.btnNext, classes.btnHistory)}></button>
      </div>
    </section>
  );
}
