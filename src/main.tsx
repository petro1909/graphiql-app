import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/index.tsx';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@components/errorFallback/index.tsx';
import { LocaleProvider } from './localization/localeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
