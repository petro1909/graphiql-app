import { ErrorFallback } from './index';
import { renderWithProviders } from '@test/renderWithProviders';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('ErrorFallback', () => {
  it('render ErrorFallback', () => {
    renderWithProviders(<ErrorFallback />);

    const name = screen.getByText('Something wend wrong');
    expect(name).toBeInTheDocument();
  });
});
