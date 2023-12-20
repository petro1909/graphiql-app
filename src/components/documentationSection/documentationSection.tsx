import classNames from 'classnames';

import classes from './documentation.module.scss';

export const DocumentationSection: React.FC = () => {
  const isDocsShown = false;

  return <div className={classNames(classes.documentationContent, isDocsShown && classes.visible)}>Documentation content</div>;
};
