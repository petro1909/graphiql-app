import { GraphQlField } from './graphqlEntity/graphqlField';
import { GraphQlType } from './graphqlEntity/graphqlType';
import { AllTypes } from './schema/schema';
import { GraphQlEntity, GraphQlSearchInputType } from '@app_types/graphql';
import { isGraphQlSchema, isGraphQlType, isGraphQlField } from '@helpers/typeGuards';

type DocumentationContentProps = {
  activeEntity: GraphQlEntity;
  handleActiveEntity: (searchInput: GraphQlSearchInputType) => void;
};

export function DocumentationContent({ activeEntity, handleActiveEntity }: DocumentationContentProps) {
  if (isGraphQlSchema(activeEntity)) {
    return <AllTypes schema={activeEntity} handleClick={handleActiveEntity} />;
  }
  if (isGraphQlType(activeEntity)) {
    return <GraphQlType type={activeEntity} handleClick={handleActiveEntity} />;
  }
  if (isGraphQlField(activeEntity)) {
    return <GraphQlField field={activeEntity} handleClick={handleActiveEntity} />;
  }

  return null;
}
