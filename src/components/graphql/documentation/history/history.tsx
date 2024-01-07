import classes from './history.module.scss';
import { Button } from '@components/button/button';
import { setActiveEntity } from '@redux/docsSlice';
import { historyBack, historyForward } from '@redux/historySlice';
import { useAppDispatch } from '@redux/hooks';
import { selectNext, selectPrev } from '@redux/selectors';
import { classNames } from '@utils/classNames';
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
    <div data-testid="history" className={classes.historyBtnContainer}>
      {prev && (
        <Button onClick={handleHistoryBack} className={classNames(classes.historyItem, classes.itemLeft, !prev && classes.historyDisabled)}>
          <span className={classNames(classes.btnPrev, classes.btnHistory)}></span>
          <span>{prev.fieldName || prev.typeName}</span>
        </Button>
      )}

      {next && (
        <Button onClick={handleHistoryForward} className={classNames(classes.historyItem, classes.itemRight, !next && classes.historyDisabled)}>
          <span>{next.fieldName || next.typeName}</span>
          <span className={classNames(classes.btnNext, classes.btnHistory)}></span>
        </Button>
      )}
    </div>
  );
}
