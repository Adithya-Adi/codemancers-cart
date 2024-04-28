import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//user routes
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Home from "./pages/User/Home";
import Cart from "./pages/User/Cart";
//admin routes
import AdminLogin from "./pages/Admin/AdminLogin";
//layout
import UserLayout from "./layouts/UserLayout";
import CheckoutPage from "./pages/User/Checkout";

function App() {
  return (
    <Router>
      <Routes>
        {/* user routes */}
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<UserLayout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<CheckoutPage />} />
        </Route>
        {/* admin routes*/}
        <Route path='/admin'>
          <Route index element={<AdminLogin />} />
        </Route>
      </Routes>
    </Router >
  )
}

export default App