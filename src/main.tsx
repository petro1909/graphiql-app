import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/index.tsx';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@components/errorFallback/index.tsx';
import { LocaleProvider } from './localization/localeProvider.tsx';
import { Provider } from 'react-redux';
import { store } from '@redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Provider store={store}>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
