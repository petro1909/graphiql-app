import { Avatar } from './avatar';
import { renderWithProviders } from '@test/renderWithProviders';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Avatar', () => {
  it('render avatar', () => {
    renderWithProviders(<Avatar name="test test" />);

    const name = screen.getByText('t');
    expect(name).toBeInTheDocument();
  });
});
