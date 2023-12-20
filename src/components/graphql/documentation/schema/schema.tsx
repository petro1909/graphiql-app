import classes from './schema.module.scss';
import { TypeName } from '../graphqlEntity/graphqlTypeName';
import { GraphQlSearchInputType, __Schema, __Type } from '@app_types/graphql';
import { useLocale } from '@localization/useLocale';

type AllTypesProps = {
  schema: __Schema;
  handleClick: (entity: GraphQlSearchInputType) => void;
};

export function AllTypes({ schema, handleClick }: AllTypesProps) {
  const { language } = useLocale();
  const rootTypes: Array<{ name: string; type: __Type | undefined }> = [
    { name: 'query', type: schema.queryType },
    { name: 'mutation', type: schema.mutationType },
    { name: 'subscription', type: schema.subscriptionType },
  ];
  const endpointTypes = schema.types.filter(
    (type) =>
      !type.name.includes('__') &&
      type.name !== schema.queryType.name &&
      type.name !== schema.mutationType?.name &&
      type.name !== schema.subscriptionType?.name
  );
  const gpaphQLTypes = schema.types.filter((type) => type.name.includes('__'));

  return (
    <>
      <section>
        <h3 className={classes.typesListHeader}>{language.strings.rootTypes}</h3>
        {rootTypes.map(
          (rootType) =>
            rootType.type && (
              <p className={classes.rootType} key={rootType.name}>
                <span>{rootType.name}: </span>
                <TypeName name={rootType.type.name} handleClick={() => handleClick({ typeName: rootType.type!.name })} />
              </p>
            )
        )}
      </section>

      <section>
        <h3 className={classes.typesListHeader}>{language.strings.endpointTypes}</h3>
        {endpointTypes.map((type) => (
          <div key={type.name}>
            <TypeName name={type.name} handleClick={() => handleClick({ typeName: type.name })} />
          </div>
        ))}
      </section>

      <section>
        <h3 className={classes.typesListHeader}>{language.strings.graphqlTypes}</h3>
        {gpaphQLTypes.map((type) => (
          <div key={type.name}>
            <TypeName name={type.name} handleClick={() => handleClick({ typeName: type.name })} />
          </div>
        ))}
      </section>
    </>
  );
}
