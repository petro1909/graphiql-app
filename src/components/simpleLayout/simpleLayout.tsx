import { Footer } from '@components/footer/footer';
import { Outlet } from 'react-router-dom';

export function SimpleLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
