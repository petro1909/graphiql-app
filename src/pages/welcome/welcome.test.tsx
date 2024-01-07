import { Welcome } from './welcome';
import { renderWithProviders } from '@test/renderWithProviders';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Welcome', () => {
  it('render Welcome Page', async () => {
    renderWithProviders(<Welcome />);

    const welcomePageElement = screen.getByText('Welcome to GraphiQL progect');
    expect(welcomePageElement).toBeInTheDocument();

    const headerElement = screen.getByText('Welcome Page');
    expect(headerElement).toBeInTheDocument();
  });
});
