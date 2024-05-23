import AdminNavBar from '../components/Admin/AdminNavBar';
import Footer from '../components/Common/Footer';
import { Outlet, Navigate } from 'react-router-dom';

function AdminLayout() {
  const isLoggedIn : string | null = localStorage.getItem('loggedInAdmin');
  const adminToken : string | null = localStorage.getItem('admin_token');
  if (!isLoggedIn || !adminToken) {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      <AdminNavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default AdminLayout;
