import AdminNavBar from '../components/Admin/AdminNavBar';
import Footer from '../components/Common/Footer';
import { Outlet } from 'react-router-dom';

function AdminLayout() {

  return (
    <>
      <AdminNavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default AdminLayout;
