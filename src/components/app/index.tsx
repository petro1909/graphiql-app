import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@components/layout/layout';
import { SimpleLayout } from '@components/simpleLayout/simpleLayout';
import { AuthorizationPage } from '@pages/auth';
import { WelcomePage } from '@pages/welcome';
import { MainPage } from '@pages/main';
import { NotFound } from '@pages/404';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/gpaphiql" element={<MainPage />} />
        </Route>
        <Route path="/" element={<SimpleLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/auth" element={<AuthorizationPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
