import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './App.scss';

import RootLayout from './pages/Root';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import Home from './pages/Home';

import { auth } from './firebase';

import { useDispatch } from 'react-redux';
import { userActions } from './store/user';
import { currentUser, checkAuthLoader } from './functions/auth';
import ErrorPage from './pages/Error';
import History from './pages/user/History';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import UserRootLayout from './pages/UserRoot';
import AdminRootLayout from './pages/AdminRoot';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import AllProducts from './pages/admin/product/AllProducts';
import Product from './pages/Product';
import CategoryHome from './pages/category/CategoryHome';
import SubHome from './pages/sub/SubHome';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import SideDrawer from './components/drawer/SideDrawer';
import Checkout from './pages/Checkout';
import CreateCouponPage from './pages/admin/coupon/CreateCouponPage';
import Payment from './pages/Payment';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch(
              userActions.login({
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              })
            );
          })
          .catch((err) => console.log(err));
      }
    });
    //cleanup
    return () => unsubscribe();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: 'shop', element: <Shop /> },
        { path: 'cart', element: <Cart /> },
        { path: 'checkout', element: <Checkout /> },
        { path: 'payment', element: <Payment /> },
        { path: 'product/:slug', element: <Product /> },
        { path: 'category/:slug', element: <CategoryHome /> },
        { path: 'sub/:slug', element: <SubHome /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'register/complete', element: <RegisterComplete /> },
        { path: 'forgot/password', element: <ForgotPassword /> },
        {
          path: 'user',
          element: <UserRootLayout />,
          loader: checkAuthLoader(),
          children: [
            { index: true, element: <History /> },
            { path: 'history', element: <History /> },
            { path: 'password', element: <Password /> },
            { path: 'wishlist', element: <Wishlist /> },
          ],
        },
        {
          path: 'admin',
          element: <AdminRootLayout />,
          loader: checkAuthLoader(),
          children: [
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: 'category', element: <CategoryCreate /> },
            { path: 'category/:slug', element: <CategoryUpdate /> },
            { path: 'sub', element: <SubCreate /> },
            { path: 'sub/:slug', element: <SubUpdate /> },
            { path: 'product', element: <ProductCreate /> },
            { path: 'product/:slug', element: <ProductUpdate /> },
            { path: 'products', element: <AllProducts /> },
            { path: 'coupon', element: <CreateCouponPage /> },
          ],
        },
      ],
    },
  ]);

  // close toast after 2 seconds
  return (
    <>
      <ToastContainer autoClose={2000} />
      <SideDrawer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
