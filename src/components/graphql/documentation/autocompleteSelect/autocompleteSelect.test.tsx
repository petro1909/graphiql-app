import { AutocompleteSelect } from '@components/graphql/documentation/autocompleteSelect/autocompleteSelect';
import { testEntities } from '@test/graphql/testEntities';
import { renderWithProviders } from '@test/renderWithProviders';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

describe('Test autocomplete select', () => {
  it('Should show filtered elements', async () => {
    const placeholder = 'search in schema';
    const inputValue = 'co';
    renderWithProviders(<AutocompleteSelect placeholder={placeholder} handleSelectItem={vitest.fn()} />, {
      preloadedState: { docs: { isDocsEnable: true, entities: testEntities, schema: null, activeEntity: null } },
    });
    fireEvent.change(screen.getByPlaceholderText(placeholder), { target: { value: inputValue } });
    const supposedItems = await vitest.waitFor(() => screen.findAllByTestId('proposedItem'));
    expect(supposedItems.length).toBe(4);
    vitest.useRealTimers();
  });
});
