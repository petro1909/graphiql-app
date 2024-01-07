import { TypeName } from './graphqlTypeName';
import { GraphQlSearchInputType, __Type, __TypeKind } from '@app_types/graphql';

type ReturnTypePros = {
  type: __Type;
  handleClick: (entity: GraphQlSearchInputType) => void;
};

export function GraphqlCompoisteType({ type, handleClick }: ReturnTypePros) {
  if (type.ofType === null) {
    return <TypeName name={type.name!} handleClick={() => handleClick({ typeName: type.name! })} />;
  }
  if (type.kind === __TypeKind.LIST || type.kind === __TypeKind.ENUM) {
    return (
      <>
        <span>[</span>
        {<GraphqlCompoisteType type={type.ofType} handleClick={handleClick} />}
        <span>]</span>
      </>
    );
  }
  if (type.kind === __TypeKind.NON_NULL) {
    return (
      <>
        {<GraphqlCompoisteType type={type.ofType} handleClick={handleClick} />}
        <span>!</span>
      </>
    );
  }

  return <GraphqlCompoisteType type={type.ofType} handleClick={handleClick} />;
}
