import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from '@components/layout/layout';
import { SimpleLayout } from '@components/simpleLayout/simpleLayout';
import { AuthorizationPage } from '@pages/auth';
import { WelcomePage } from '@pages/welcome';
import { MainPage } from '@pages/main';
import { NotFound } from '@pages/404';

import './style.css';
import { StrictMode } from 'react';

const mainPath = '/';
const authPath = '/auth';
const anyOtherPath = '*';
const gpaphiqlPath = '/gpaphiql';

const router = createBrowserRouter([
  {
    path: mainPath,
    element: <SimpleLayout />,
    children: [
      { index: true, element: <WelcomePage /> },
      {
        path: authPath,
        element: <AuthorizationPage />,
      },
      { path: anyOtherPath, element: <NotFound /> },
    ],
  },
  {
    path: mainPath,
    element: <Layout />,
    children: [
      {
        path: gpaphiqlPath,
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
