export type GraphQLResponse = {
  data: {
    __schema: __Schema;
  };
};

export type __Schema = {
  types: __Type[];
  queryType: __Type;
  mutationType?: __Type;
  subscriptionType?: __Type;
  directives?: __Directive[];
};

export enum __TypeKind {
  SCALAR = 'SCALAR',
  OBJECT = 'OBJECT',
  INTERFACE = 'INTERFACE',
  UNION = 'UNION',
  ENUM = 'ENUM',
  INPUT_OBJECT = 'INPUT_OBJECT',
  LIST = 'LIST',
  NON_NULL = 'NON_NULL',
}

export type __Field = {
  name: string;
  description: string;
  args: __InputValue[];
  type: __Type;
  isDeprecated: boolean;
  deprecationReson: string;
};

export type __InputValue = {
  name: string;
  description: string;
  type: __Type;
  defaultValue: string;
};

export type __EnumValue = {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReson: string;
};

export type __Type = {
  kind: __TypeKind;
  name: string;
  description: string;
  fields: __Field[];
  interfaces: __Type[];
  possibleTypes: __Type[];
  enumValues: __EnumValue[];
  inputFields: __InputValue[];
  ofType: __Type;
};

export type __Directive = {
  name: string;
  description: string;
  locations: string[];
  args: __InputValue[];
};
