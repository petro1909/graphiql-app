import { Layout } from './layout';
import { renderWithProviders } from '@test/renderWithProviders';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Layout', () => {
  it('renders Layout', () => {
    renderWithProviders(<Layout />);

    const footerElement = screen.getByText(/Application was created in/);
    expect(footerElement).toBeInTheDocument();
  });
});
