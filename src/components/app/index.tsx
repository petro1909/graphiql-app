import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from '@components/layout/layout';
import { SimpleLayout } from '@components/simpleLayout/simpleLayout';
import { AuthorizationPage } from '@pages/auth';
import { WelcomePage } from '@pages/welcome';
import { MainPage } from '@pages/main';
import { NotFound } from '@pages/404';

import './style.css';
import { StrictMode } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SimpleLayout />,
    children: [
      { index: true, element: <WelcomePage /> },
      {
        path: '/auth',
        element: <AuthorizationPage />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/gpaphiql',
        element: <MainPage />,
      },
    ],
  },
]);

export function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
