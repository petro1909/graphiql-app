import { Alert } from '@components/alert/alert';
import { Footer } from '@components/footer/footer';
import { errorMessage } from '@redux/selectors';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export function Layout() {
  const showErrorMessage = useSelector(errorMessage);

  return (
    <>
      {showErrorMessage && <Alert message={showErrorMessage} />}
      <Outlet />
      <Footer />
    </>
  );
}
