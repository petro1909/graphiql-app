import { Documentation } from '@components/graphql/documentation/documentation';
import schema from '@test/graphql/testGraphqlSchema.json';
import { createPreloadedState, renderWithProviders } from '@test/renderWithProviders';
import { screen, waitFor } from '@testing-library/react';
import { HttpResponse, graphql, http } from 'msw';
import { describe, expect, it } from 'vitest';

describe('Test GraphQl documentation section', () => {
  describe('Test init schema render', () => {
    it('Render documentation after successfull request', async () => {
      renderWithProviders(<Documentation />, {
        preloadedState: createPreloadedState({ endpoint: { rawRequest: { URL: 'http://fakeValidEndpoint.com' } } }),
        responseOverride: [graphql.query('IntrospectionQuery', () => HttpResponse.json(schema))],
      });
      const schemaText = await screen.findByText('Schema');
      expect(schemaText).toBeInTheDocument();
    });
    it('Return null after invalid request', async () => {
      const invalidEndpoint = 'http://fakeInvalidValidEndpoint.com';
      renderWithProviders(<Documentation />, {
        preloadedState: createPreloadedState({ endpoint: { rawRequest: { URL: invalidEndpoint } } }),
        responseOverride: [
          http.post(invalidEndpoint, () => {
            return new Response(null, {
              status: 404,
            });
          }),
        ],
      });
      const schemaText = await waitFor(() => screen.queryByText('Schema'));
      expect(schemaText).not.toBeInTheDocument();
    });
  });
});
