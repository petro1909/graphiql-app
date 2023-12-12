import { useEffect, useMemo, useRef, useState } from 'react';
import classes from './baseEditor.module.scss';
import { EditorLine } from './editorLine/editorLine';

type BaseEditorProps = {
  initText: string;
  handleChangeText?: (text: string) => void;
  isDisabled?: boolean;
  isLinesDisabled?: boolean;
};

export function BaseEditor({ initText, handleChangeText, isDisabled = false, isLinesDisabled = false }: BaseEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState(initText);
  const [cursor, setCursor] = useState(0);

  const rows = useMemo(() => {
    return text.split('\n').length;
  }, [text]);

  const currentRow = useMemo(() => {
    const textBefore = text.slice(0, ref.current?.selectionEnd);
    const textArr = textBefore.split('\n');
    return textArr.length;
  }, [cursor]);

  useEffect(() => {
    setText(initText);
  }, [initText]);

  useEffect(() => {
    const input = ref.current;
    if (input) input.setSelectionRange(cursor, cursor);
    handleChangeText && handleChangeText(text);
  }, [ref, cursor, text]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    if (e.code === 'Tab') {
      e.preventDefault();
      target.setRangeText('\t', target.selectionStart, target.selectionStart, 'end');
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    if (e.key === '{') {
      target.setRangeText('}', target.selectionStart, target.selectionStart, 'preserve');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCursor(e.target.selectionStart);
    setText(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => {
    setText(e.currentTarget.value);
    setCursor(e.currentTarget.selectionEnd);
  };

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
