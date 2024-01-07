import classes from './editorLine.module.scss';
import { classNames } from '@utils/classNames';

type EditorLineProps = {
  isActive: boolean;
  lineNumber: number;
};

export function EditorLine({ isActive, lineNumber }: EditorLineProps) {
  return (
    <div className={classes.lineWrapper}>
      <span className={classNames(classes.lineNumber, isActive && classes.active)}>{lineNumber}</span>
    </div>
  );
}
