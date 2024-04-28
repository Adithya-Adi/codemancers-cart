import NavBar from "../components/User/NavBar";
import Footer from "../components/Common/Footer";
import { Outlet } from "react-router-dom";

function UserLayout() {

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserLayout;
