import { NotFound } from './notFound';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

describe('Not found page', () => {
  it('renders 404 page for invalid route', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const signInElement = screen.getByText('404');
    expect(signInElement).toBeInTheDocument();
  });
});
