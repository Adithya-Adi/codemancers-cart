import React, { lazy, Suspense, LazyExoticComponent } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//user pages
const Login: LazyExoticComponent<React.ComponentType<{}>> = lazy(() => import('./pages/User/Login'));
const Register: LazyExoticComponent<React.ComponentType<{}>> = lazy(() => import('./pages/User/Register'));
const Home: LazyExoticComponent<React.ComponentType<{}>> = lazy(() => import('./pages/User/Home'));
const Cart: LazyExoticComponent<React.ComponentType<{}>> = lazy(() => import('./pages/User/Cart'));
const CheckoutPage: LazyExoticComponent<React.ComponentType<{}>>  = lazy(() => import('./pages/User/Checkout'));
//admin pages
const AdminLogin: LazyExoticComponent<React.ComponentType<{}>> = lazy(() => import('./pages/Admin/AdminLogin'));
const ProductsView: LazyExoticComponent<React.ComponentType<{}>>  = lazy(() => import('./pages/Admin/ProductsView'));
const Products: LazyExoticComponent<React.ComponentType<{}>>  = lazy(() => import('./pages/Admin/Products'));
const Users: LazyExoticComponent<React.ComponentType<{}>>  = lazy(() => import('./pages/Admin/Users'));
// layouts
const UserLayout: LazyExoticComponent<React.ComponentType<{}>> = lazy(() => import('./layouts/UserLayout'));
const AdminLayout: LazyExoticComponent<React.ComponentType<{}>>  = lazy(() => import('./layouts/AdminLayout'));
// not found page
import NotFoundPage from './pages/NotFoundPage';
//loading component
import Loading from './components/Common/Loading';
// Toast
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* user routes */}
          <Route
            path='/'
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
           <Route
            path='/register'
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <UserLayout />
              </Suspense>
            }
          >
            <Route
              path='/home'
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path='/cart'
              element={
                <Suspense fallback={<Loading />}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path='/checkout'
              element={
                <Suspense fallback={<Loading />}>
                  <CheckoutPage />
                </Suspense>
              }
            />
          </Route>
           
          {/* admin routes*/}
          <Route path='/admin'>
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <AdminLogin />
                </Suspense>
              }
            />
            <Route
              element={
                <Suspense fallback={<Loading />}>
                  <AdminLayout />
                </Suspense>
              }
            >
              <Route
                path='users'
                element={
                  <Suspense fallback={<Loading />}>
                    <Users />
                  </Suspense>
                }
              />
              <Route
                path='products/view'
                element={
                  <Suspense fallback={<Loading />}>
                    <ProductsView />
                  </Suspense>
                }
              />
              <Route
                path='products'
                element={
                  <Suspense fallback={<Loading />}>
                    <Products />
                  </Suspense>
                }
              />
              <Route
                path='products/:id'
                element={
                  <Suspense fallback={<Loading />}>
                    <Products />
                  </Suspense>
                }
              />
            </Route>
          </Route>
          {/* 404 not found */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes> 
      </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
