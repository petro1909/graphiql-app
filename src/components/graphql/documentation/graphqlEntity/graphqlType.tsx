import { GraphQlEntity, __Type } from '@app_types/graphql';
import { GraphqlCompoisteType } from './graphqlCompoisteType';
import classes from './graphqlEntity.module.scss';

type SingleTypeProps = {
  type: __Type;
  handleClick: (entity: GraphQlEntity) => void;
};

export function GraphQlType({ type, handleClick }: SingleTypeProps) {
  return (
    <section>
      <h3 className={classes.entityHeader}>{type.name}</h3>

      {type.description && (
        <section>
          <p className={classes.description}>{type.description}</p>
        </section>
      )}

      {type.interfaces && type.interfaces?.length !== 0 && (
        <section className={classes.propertyWrapper}>
          <h4 className={classes.propertyHeader}>Implements</h4>
          <ul className={classes.propertyList}>
            {type.interfaces.map((iface) => (
              <li className={classes.typeFieldsWrapper} key={iface.name}>
                <GraphqlCompoisteType type={iface} handleClick={() => handleClick({ typeName: iface.name })} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {type.inputFields && (
        <section className={classes.propertyWrapper}>
          <h4 className={classes.propertyHeader}>Input Fields</h4>
          <ul className={classes.propertyList}>
            {type.inputFields.map((inField) => (
              <li className={classes.typeFieldsWrapper} key={inField.name}>
                <span onClick={() => handleClick({ typeName: type.name, fieldName: inField.name })}>{inField.name}: </span>
                <GraphqlCompoisteType type={inField.type} handleClick={handleClick} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {type.enumValues && (
        <section className={classes.propertyWrapper}>
          <h4 className={classes.propertyHeader}>Enum Values</h4>
          <ul className={classes.propertyList}>
            {type.enumValues.map((enumValue) => (
              <li key={enumValue.name} className={classes.typeFieldsWrapper}>
                <span className={classes.enumName}>{enumValue.name}</span>
                <p className={classes.description}>{enumValue.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {type.fields && (
        <section className={classes.propertyWrapper}>
          <h4 className={classes.propertyHeader}>Fields</h4>
          <ul className={classes.propertyList}>
            {type.fields.map((field) => (
              <li className={classes.typeFieldsWrapper} key={field.name}>
                <span className={classes.fieldName} onClick={() => handleClick({ typeName: type.name, fieldName: field.name })}>
                  {field.name}
                </span>
                {field.args.length !== 0 && (
                  <>
                    <span>{' ( '}</span>
                    {field.args.map((arg) => (
                      <p className={classes.fieldArg} key={arg.name}>
                        <span>{arg.name}: </span>
                        <GraphqlCompoisteType type={arg.type} handleClick={handleClick} />
                      </p>
                    ))}
                    <span>{' ) '}</span>
                  </>
                )}
                : <GraphqlCompoisteType type={field.type} handleClick={handleClick} />
                {field.description && <p className={classes.description}>{field.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
