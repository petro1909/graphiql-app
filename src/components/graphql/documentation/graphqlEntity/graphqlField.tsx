import { GraphqlCompoisteType } from './graphqlCompoisteType';
import classes from './graphqlEntity.module.scss';
import { GraphQlSearchInputType, __Field, __InputValue } from '@app_types/graphql';
import { isGraphQlField, isGraphQlInputValue } from '@helpers/typeGuards';
import { useLocale } from '@localization/useLocale';

type GraphQlFieldProps = {
  field: __Field | __InputValue;
  handleClick: (entity: GraphQlSearchInputType) => void;
};

export function GraphQlField({ field, handleClick }: GraphQlFieldProps) {
  const { language } = useLocale();

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
          <h4 className={classes.propertyHeader}>{language.strings.agruments}</h4>
          {field.args.map((arg) => (
            <p className={classes.fieldArg} key={arg.name}>
              <span>{arg.name}: </span>
              <GraphqlCompoisteType type={arg.type} handleClick={handleClick} />
            </p>
          ))}
        </section>
      )}

      <section>
        <h4 className={classes.propertyHeader}>{language.strings.type}</h4>
        <GraphqlCompoisteType type={field.type} handleClick={handleClick} />
      </section>

      {isGraphQlInputValue(field) && (
        <section>
          <h4 className={classes.propertyHeader}>{language.strings.defaultValue}</h4>
          <p>{field.defaultValue}</p>
        </section>
      )}

      {field.isDeprecated && (
        <section>
          <h4 className={classes.propertyHeader}>{language.strings.deprecated}</h4>
          <p>{field.deprecationReason}</p>
        </section>
      )}
    </section>
  );
}
