import { BaseProps } from '@app_types/baseProps';
import classes from './sandboxContainer.module.scss';

export const SandboxContainer = ({ children }: BaseProps) => {
  return <div className={classes.sandboxContainer}>{children}</div>;
};
