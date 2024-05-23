import NavBar from '../components/User/NavBar';
import Footer from '../components/Common/Footer';
import { Outlet, Navigate } from 'react-router-dom';

function UserLayout() {
  const isLoggedIn : string | null = localStorage.getItem('loggedInUser');
  const token : string | null = localStorage.getItem('token');
  if (!isLoggedIn || !token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserLayout;
