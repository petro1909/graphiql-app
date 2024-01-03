import classes from './baseEditor.module.scss';
import { useEditor } from './editorHooks/useEditor';
import { EditorLine } from './editorLine/editorLine';
import { useRef } from 'react';

type BaseEditorProps = {
  initText: string;
  handleChangeText?: (text: string) => void;
  isDisabled?: boolean;
  isLinesDisabled?: boolean;
};

export function BaseEditor({ initText, handleChangeText, isDisabled = false, isLinesDisabled = false }: BaseEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { text, rows, currentRow, handleKeyDown, handleKeyUp, handleChange, handleClick } = useEditor(initText, ref, handleChangeText);

  return (
    <section className={classes.editorWrapper}>
      {!isLinesDisabled && (
        <section className={classes.lineNumbers}>
          {[...Array(rows).keys()].map((value) => (
            <EditorLine isActive={currentRow === value + 1} lineNumber={value + 1} key={value} />
          ))}
        </section>
      )}

      <textarea
        className={classes.editor}
        ref={ref}
        rows={rows}
        value={text}
        onChange={handleChange}
        onClick={handleClick}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
      />
    </section>
  );
}
