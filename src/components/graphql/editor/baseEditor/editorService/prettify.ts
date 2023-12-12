export function prettify(text: string): string {
  let indentLevel = 0;
  let lines = text.trim().split('\n');
  lines = lines
    .map((line) =>
      line
        .trim()
        .replaceAll(/(\s|\t)+/g, ' ')
        .replaceAll('{', '{\n')
        .replaceAll('}', '\n}')
    )
    .filter((line) => line.trim() !== '');
  lines = lines.join('').split('\n');
  lines = lines.map((line) => {
    if (line.includes('}')) {
      --indentLevel;
    }
    line = ''.padEnd(indentLevel, '\t').concat(line);
    if (line.includes('{')) {
      ++indentLevel;
    }
    return line;
  });
  return lines.join('\n');
}
