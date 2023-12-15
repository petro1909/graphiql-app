import { GraphQlEntity, __Field, __InputValue } from '@app_types/graphql';
import { GraphqlCompoisteType } from './graphqlCompoisteType';
import classes from './graphqlEntity.module.scss';
import { isGraphQlField, isGraphQlInputValue } from '@helpers/typeGuards';

type GraphQlFieldProps = {
  field: __Field | __InputValue;
  handleClick: (entity: GraphQlEntity) => void;
};

export function GraphQlField({ field, handleClick }: GraphQlFieldProps) {
  return (
    <section>
      <h3 className={classes.entityHeader}>{field.name}</h3>

      {field.description && (
        <section>
          <p className={classes.description}>{field.description}</p>
        </section>
      )}

      {isGraphQlField(field) && field.args.length !== 0 && (
        <section>
          <h4 className={classes.propertyHeader}>Arguments</h4>
          {field.args.map((arg) => (
            <p className={classes.fieldArg} key={arg.name}>
              <span>{arg.name}: </span>
              <GraphqlCompoisteType type={arg.type} handleClick={handleClick} />
            </p>
          ))}
        </section>
      )}

      <section>
        <h4 className={classes.propertyHeader}>Type</h4>
        <GraphqlCompoisteType type={field.type} handleClick={handleClick} />
      </section>

      {isGraphQlInputValue(field) && (
        <section>
          <h4 className={classes.propertyHeader}>Default Value</h4>
          <p>{field.defaultValue}</p>
        </section>
      )}

      {field.isDeprecated && (
        <section>
          <h4 className={classes.propertyHeader}>Deprecated</h4>
          <p>{field.deprecationReason}</p>
        </section>
      )}
    </section>
  );
}
