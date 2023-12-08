import { Footer } from '@components/footer/footer';
import { Header } from '@components/header/header';
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
