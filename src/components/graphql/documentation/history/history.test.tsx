import { Documentation } from '../documentation';
import schema from '@test/graphql/testGraphqlSchema.json';
import { renderWithProviders, createPreloadedState } from '@test/renderWithProviders';
import { fireEvent, screen, within } from '@testing-library/react';
import { graphql, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

describe('Test history interaction', () => {
  it('Render documentation after successfull request', async () => {
    Element.prototype.scrollTo = () => {};
    renderWithProviders(<Documentation />, {
      preloadedState: createPreloadedState({ endpoint: { rawRequest: { URL: 'http://fakeValidEndpoint.com' } } }),
      responseOverride: [graphql.query('IntrospectionQuery', () => HttpResponse.json(schema))],
    });
    const history = await screen.findByTestId('history');

    const continent = await screen.findByText('Continent');
    fireEvent.click(continent);
    screen.debug();
    const historySchema = within(history).getByText('__Schema');
    expect(historySchema).toBeInTheDocument();

    fireEvent.click(historySchema);
    const historyContinent = within(history).getByText('Continent');
    expect(historyContinent).toBeInTheDocument();
  });
});
