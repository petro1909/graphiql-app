import { Alert } from './alert';
import { renderWithProviders } from '@test/renderWithProviders';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('alert', () => {
  it('render alert', () => {
    renderWithProviders(<Alert message="test message" />);

    const message = screen.getByText('test message');
    expect(message).toBeInTheDocument();
  });

  it('close alert by button click', async () => {
    renderWithProviders(<Alert message="test message" />);
    const alert = screen.getByTestId('alert-testid');
    const closeButton = screen.getByTestId('close-button');

    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(alert.className).toMatch(/hide/);
    });
  });

  it('close alert in 5 sec', async () => {
    renderWithProviders(<Alert message="test message" />);
    const alert = screen.getByTestId('alert-testid');

    await waitFor(
      () => {
        expect(alert.className).toMatch(/hide/);
      },
      { timeout: 5000 }
    );
  });
});
