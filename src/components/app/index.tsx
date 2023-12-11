import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '@components/constants/constants';
import { Layout } from '@components/layout/layout';
import { SimpleLayout } from '@components/simpleLayout/simpleLayout';
import { AuthorizationPage } from '@pages/auth/auth';
import { Welcome } from '@pages/welcome/welcome';
import { MainPage } from '@pages/main/mainPage';
import { NotFound } from '@pages/404/notFound';

import './style.css';

const router = createBrowserRouter([
  {
    path: routes.WELCOME_URL,
    element: <SimpleLayout />,
    children: [
      { index: true, element: <Welcome /> },
      {
        path: routes.AUTH_URL,
        element: <AuthorizationPage />,
      },
      { path: routes.ANY_OTHER_URL, element: <NotFound /> },
    ],
  },
  {
    path: routes.WELCOME_URL,
    element: <Layout />,
    children: [
      {
        path: routes.MAIN_URL,
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
