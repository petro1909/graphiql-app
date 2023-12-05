import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@components/layout/index';
import { AuthorizationPage } from '@pages/auth';
import { WelcomePage } from '@pages/welcome';
import { MainPage } from '@pages/main';
import { NotFound } from '@pages/404';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/auth" element={<AuthorizationPage />} />
          <Route path="/gpaphiql" element={<MainPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
