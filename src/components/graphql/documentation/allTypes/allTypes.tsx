import { __Schema } from '@app_types/graphql';

type AllTypesProps = {
  schema: __Schema;
  onClick: (typeName: string) => void;
};

export function AllTypes({ schema, onClick }: AllTypesProps) {
  return (
    <>
      <section>
        <h3>Root types</h3>
        {schema?.queryType && (
          <p>
            <span>query: </span>
            <span onClick={() => onClick(schema.queryType.name)}>{schema?.queryType.name}</span>
          </p>
        )}
        {schema?.mutationType && (
          <p>
            <span>query: </span>
            <span onClick={() => onClick(schema.mutationType!.name)}>{schema?.mutationType.name}</span>
          </p>
        )}
        {schema?.subscriptionType && (
          <p>
            <span>query: </span>
            <span onClick={() => onClick(schema.subscriptionType!.name)}>{schema?.subscriptionType.name}</span>
          </p>
        )}
      </section>
      <section>
        <h3>All types</h3>
        {schema?.types.map((type) => (
          <p key={type.name} onClick={() => onClick(type.name)}>
            {type.name}
          </p>
        ))}
      </section>
    </>
  );
}
