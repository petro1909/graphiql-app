import { AuthorizationPage } from './auth';
import { renderWithProviders } from '@test/renderWithProviders';
import { screen, waitFor } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

describe('authorization page', () => {
  it('render authorization page', async () => {
    renderWithProviders(<AuthorizationPage />);

    await waitFor(() => {
      const headerElement = screen.getByText('Welcome Page');
      expect(headerElement).toBeInTheDocument();

      const signInButton = screen.getByText('Sign In');
      expect(signInButton).toBeInTheDocument();
    });
  });
});
