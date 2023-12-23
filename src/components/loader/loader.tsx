import classes from './loader.module.scss';

export function Loader() {
  return (
    <section className={classes.loaderWrapper}>
      <div className={classes.loader} />
    </section>
  );
}
