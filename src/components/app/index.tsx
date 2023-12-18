import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '@constants/constants';
import { Layout } from '@components/layout/layout';
import { SimpleLayout } from '@components/simpleLayout/simpleLayout';
import { AuthorizationPage } from '@pages/auth/auth';
import { Welcome } from '@pages/welcome/welcome';
import { MainPage } from '@pages/main/mainPage';
import { NotFound } from '@pages/404/notFound';

import './style.css';
import { SignIn } from '@pages/auth/signInForm';
import { SignUp } from '@pages/auth/signUpForm';

const router = createBrowserRouter([
  {
    path: routes.WELCOME_URL,
    element: <SimpleLayout />,
    children: [{ path: routes.ANY_OTHER_URL, element: <NotFound /> }],
  },
  {
    path: routes.WELCOME_URL,
    element: <Layout />,
    children: [
      { index: true, element: <Welcome /> },
      {
        path: routes.WELCOME_URL,
        element: <AuthorizationPage />,
        children: [
          { path: routes.SIGN_IN, element: <SignIn /> },
          { path: routes.SIGN_UP, element: <SignUp /> },
        ],
      },
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
