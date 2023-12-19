import { useState, useMemo, useEffect } from 'react';
import { newLine, keyTab, tab, openCurlyBraces, openSquareBraces, closeCurlyBraces, closeSquareBraces } from '../editorConstants';

export const useEditor = (initText: string, ref: React.RefObject<HTMLTextAreaElement>, handleChangeText?: (text: string) => void) => {
  const [text, setText] = useState(initText);
  const [cursor, setCursor] = useState(0);

  const rows = useMemo(() => {
    return text.split(newLine).length;
  }, [text]);

  const currentRow = useMemo(() => {
    const textBefore = text.slice(0, ref.current?.selectionEnd);
    const textArr = textBefore.split(newLine);

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
    if (e.code === keyTab) {
      e.preventDefault();
      target.setRangeText(tab, target.selectionStart, target.selectionStart, 'end');
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    if (e.key === openCurlyBraces || e.key === openSquareBraces) {
      const symbol = e.key === openCurlyBraces ? closeCurlyBraces : closeSquareBraces;
      target.setRangeText(symbol, target.selectionStart, target.selectionStart, 'preserve');
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

  return { text, setText, cursor, rows, currentRow, handleKeyDown, handleKeyUp, handleChange, handleClick };
};
