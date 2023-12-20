import { App } from './components/app/index.tsx';
import { LocaleProvider } from './localization/localeProvider.tsx';
import { ErrorFallback } from '@components/errorFallback/index.tsx';
import { setupStore } from '@redux/store.ts';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Provider store={setupStore()}>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
