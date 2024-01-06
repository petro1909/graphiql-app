import './style.scss';

import { Layout } from '@components/layout/layout';
import { PrivateRoute } from '@components/privateRoute/privateRoute';
import { routes } from '@constants/constants';
import { NotFound } from '@pages/404/notFound';
import { AuthorizationPage } from '@pages/auth/auth';
import { SignIn } from '@pages/auth/signInForm/signInForm';
import { SignUp } from '@pages/auth/signUpForm/signUpForm';
import { MainPage } from '@pages/main/mainPage';
import { Welcome } from '@pages/welcome/welcome';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
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
        element: (
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        ),
      },
      { path: routes.ANY_OTHER_URL, element: <NotFound /> },
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
