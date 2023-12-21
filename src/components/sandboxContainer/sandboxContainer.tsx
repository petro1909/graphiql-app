import classes from './sandboxContainer.module.scss';
import { BaseProps } from '@app_types/baseProps';

export const SandboxContainer = ({ children }: BaseProps) => {
  return <div className={classes.sandboxContainer}>{children}</div>;
};
