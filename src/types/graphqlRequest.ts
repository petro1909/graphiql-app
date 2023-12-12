type BaseGraphQLRequest = {
  URL: string;
  query: string;
};

export type GraphQLRawRequest = {
  headers: string;
  variables: string;
} & BaseGraphQLRequest;

export type GraphQLValidRequest = {
  headers?: Record<string, string | undefined>;
  variables: Record<string, string | undefined> | string;
} & BaseGraphQLRequest;
