import classes from './graphqlEntity.module.scss';
type TypeNameProps = {
  name: string;
  handleClick: () => void;
};
export function TypeName({ name, handleClick }: TypeNameProps) {
  return (
    <span className={classes.typeName} onClick={handleClick}>
      {name}
    </span>
  );
}
