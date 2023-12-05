import { Footer } from '@components/footer/index';
import { Header } from '@components/header/index';
import { Outlet } from 'react-router-dom';
export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
