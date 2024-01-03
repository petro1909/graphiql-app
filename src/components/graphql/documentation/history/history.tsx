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
    <div className={classes.historyBtnContainer}>
      {prev && (
        <button onClick={handleHistoryBack} className={classNames(classes.historyItem, classes.itemLeft, !prev && classes.historyDisabled)}>
          <span className={classNames(classes.btnPrev, classes.btnHistory)}></span>
          <span>{prev.fieldName || prev.typeName}</span>
        </button>
      )}

      {next && (
        <button onClick={handleHistoryForward} className={classNames(classes.historyItem, classes.itemRight, !next && classes.historyDisabled)}>
          <span>{next.fieldName || next.typeName}</span>
          <span className={classNames(classes.btnNext, classes.btnHistory)}></span>
        </button>
      )}
    </div>
  );
}
