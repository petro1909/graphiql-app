export function classNames(...args: (string | undefined | false)[]) {
  return args && args.filter(Boolean).join(' ');
}
