import { server } from './setupTests';
import { LocaleProvider } from '../src/localization/localeProvider';
import { AppStore, RootState, setupStore } from '../src/redux/store';
import { render, RenderOptions } from '@testing-library/react';
import { GraphQLHandler, HttpHandler } from 'msw';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  responseOverride?: (GraphQLHandler | HttpHandler)[];
}

export const createPreloadedState = (): Partial<RootState> => {
  const state: Partial<RootState> = {};

  return state;
};

export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState = {}, store = setupStore(preloadedState), responseOverride, ...renderOptions }: ExtendedRenderOptions = {}
) {
  if (responseOverride) {
    server.use(...responseOverride);
  }
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <Provider store={store}>
        <MemoryRouter>
          <LocaleProvider>{children}</LocaleProvider>
        </MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
