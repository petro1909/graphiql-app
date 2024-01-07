import { App } from './index.tsx';
import { renderApp } from '@test/renderWithProviders';

import { describe, expect, it } from 'vitest';

describe('app', () => {
  it('render Welcome page by default', () => {
    const { getByText } = renderApp(<App />);
    const welcomeText = getByText(/Welcome to GraphiQL project/i);

    expect(welcomeText).toBeInTheDocument();
  });
});
