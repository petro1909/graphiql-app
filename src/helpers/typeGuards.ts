import { GraphQlEntity, __Field, __InputValue, __Schema, __Type } from '@app_types/graphql';

export function isGraphQlSchema(entity: GraphQlEntity): entity is __Schema {
  return entity && (entity as __Schema).queryType !== undefined;
}

export function isGraphQlField(entity: GraphQlEntity): entity is __Field {
  return entity && (entity as __Field).type !== undefined;
}

export function isGraphQlType(entity: GraphQlEntity): entity is __Type {
  return entity && (entity as __Type).fields !== undefined;
}

export function isGraphQlInputValue(entity: GraphQlEntity): entity is __InputValue {
  return entity && (entity as __InputValue).defaultValue !== undefined;
}
