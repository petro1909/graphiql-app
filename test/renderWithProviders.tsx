import { LocaleProvider } from '../src/localization/localeProvider';
import { AppStore, RootState, setupStore } from '../src/redux/store';
import { render, RenderOptions } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <Provider store={store}>
        <LocaleProvider>{children}</LocaleProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
