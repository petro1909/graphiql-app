import { EditorLine } from './editorLine';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('test editor line component', () => {
  it('should show line', () => {
    const lineNumber = 4;
    render(<EditorLine lineNumber={lineNumber} isActive={false} />);
    const lineNumberText = screen.getByText(lineNumber);
    expect(lineNumberText).toBeInTheDocument();
  });
});
