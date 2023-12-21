import { GraphQlSearchInputType } from '@app_types/graphql';

export const filterItems = (value: string, initItems: GraphQlSearchInputType[]) => {
  value = value.trim().toLowerCase();
  if (!value) {
    return [];
  }

  return initItems.filter(
    (item) => (item.typeName.toLowerCase().includes(value) && !item.fieldName) || item.fieldName?.toLocaleLowerCase().includes(value)
  );
};
