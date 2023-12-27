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
        {prev && (
          <div onClick={handleHistoryBack} className={classes.historyBtnContainer}>
            <button className={classNames(classes.btnPrev, classes.btnHistory)}></button>
            <span>{prev.fieldName || prev.typeName}</span>
          </div>
        )}
      </div>

      <div className={classNames(classes.historyItem, classes.itemRight, !next && classes.historyDisabled)}>
        {next && (
          <div onClick={handleHistoryBack} className={classes.historyBtnContainer}>
            <span onClick={handleHistoryForward}>{next.fieldName || next.typeName}</span>
            <button onClick={handleHistoryForward} className={classNames(classes.btnNext, classes.btnHistory)}></button>
          </div>
        )}
      </div>
    </section>
  );
}
