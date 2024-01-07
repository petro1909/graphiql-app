import { MainPage } from './mainPage';
import { renderWithProviders } from '@test/renderWithProviders';
import { screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

describe('private route', () => {
  it('render private route', () => {
    renderWithProviders(<MainPage />);

    expect(screen.getByText('Set endpoint')).toBeInTheDocument();
    expect(screen.getByText('Headers')).toBeInTheDocument();
  });
});
