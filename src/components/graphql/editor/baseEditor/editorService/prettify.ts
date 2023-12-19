import { closeCurlyBraces, newLine, openCurlyBraces, tab } from '../editorConstants';

export function prettify(text: string): string {
  let indentLevel = 0;
  const trimmedText = text.trim().replaceAll(/( )+/g, ' ');

  const linesString = trimmedText
    .replaceAll(/\s*{\s*/g, ' {\n')
    .replaceAll(/\s*}\s*/g, '\n}\n')
    .replaceAll(/\s*\(/g, '(')
    .replaceAll(/\s*\,/g, ',')
    .replaceAll(/\s*\:/g, ':')
    .replaceAll(/\s*\=\s*/g, ' = ');

  let lines = linesString.split(newLine);
  lines = lines.map((line) => line.trim()).filter((line) => line);

  lines = lines.map((line) => {
    if (line.includes(closeCurlyBraces)) {
      --indentLevel;
    }
    if (indentLevel >= 0) {
      line = tab.repeat(indentLevel).concat(line);
    }
    if (line.includes(openCurlyBraces)) {
      ++indentLevel;
    }

    return line;
  });

  return lines.join(newLine);
}
