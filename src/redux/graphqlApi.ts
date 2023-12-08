import { GraphQLValidRequest } from '@app_types/graphqlRequest';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const grapqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getGraphqlResult: builder.query<unknown, GraphQLValidRequest>({
      query: ({ URL, variables, query }) => ({
        url: URL,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      }),
    }),
  }),
});

export const { useLazyGetGraphqlResultQuery, useGetGraphqlResultQuery } = grapqlApi;
