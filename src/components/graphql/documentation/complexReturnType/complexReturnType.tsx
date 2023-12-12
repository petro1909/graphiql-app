import { __Type, __TypeKind } from '@app_types/graphql';

type ReturnTypePros = {
  type: __Type;
  onClick: (typeNmae: string) => void;
};

export function ReturnType({ type, onClick }: ReturnTypePros) {
  if (type.ofType === null) {
    return <span onClick={() => onClick(type.name)}>{type.name}</span>;
  }
  if (type.kind === __TypeKind.LIST || type.kind === __TypeKind.ENUM) {
    return <span>[{<ReturnType type={type.ofType} onClick={onClick} />}]</span>;
  }
  if (type.kind === __TypeKind.NON_NULL) {
    return <span>{<ReturnType type={type.ofType} onClick={onClick} />}!</span>;
  }
  return <span>{<ReturnType type={type.ofType} onClick={onClick} />}</span>;
}
