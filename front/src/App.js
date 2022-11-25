
import './App.css';
import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';

// router traido desde react-router-dom no confundir con el de express
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/admin/Dashboard'
import ProductList from './components/admin/ProductList'
import Newproduct from './components/admin/Newproduct'
import Cart from './components/cart/Cart'
import Login from './components/user/Login';
import Register from './components/user/Register';
import { loadUser } from './actions/userActions';
import store from './store'
import Profile from './components/user/Profile';
import ProtectedRoutes from './routes/ProtectedRoutes';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import  NewPassword  from './components/user/NewPassword';
import UpdateProduct from './components/admin/UpdateProduct';
import Shipping from './components/cart/Shipping';
import ConfimOrder from './components/cart/ConfimOrder';
import Payment from './components/cart/Payment';
import { Success } from './components/cart/Success';
import ProtectedRoute from './routes/ProtectedRoutes';
import { ListOrder } from './components/order/ListOrder';
import { OrderDetails } from './components/order/OrderDetails';
import OrdersList from './components/admin/OderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import { ProductDetails } from './components/products/ProductDetails';
import {useSelector} from 'react-redux'
  
function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
   const {user, isAuthenticated, loading} = useSelector(state => state.auth)
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/producto/:id" element={<ProductDetails />} />
            <Route path="/listaProductos" element={<ProductList />} />
            <Route path="/nuevoProducto" element={<Newproduct />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userLogin" element={<Profile />} />
            <Route path="/userLogin/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/resetPassword/:token" element={<NewPassword />} />

            {/*Ruta protegida*/}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes isAdmin={true}>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/updateProduct/:id"
              element={
                <ProtectedRoutes isAdmin={true}>
                  <UpdateProduct />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/orderList"
              element={
                <ProtectedRoute isAdmin={true}>
                  <OrdersList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UsersList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/order/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ProcessOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ProductReviews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shipping"
              element={
                <ProtectedRoutes>
                  <Shipping />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/order/confirm"
              element={
                <ProtectedRoutes>
                  <ConfimOrder />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoutes>
                  <Payment />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoutes>
                  <Success />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/myOrders"
              element={
                <ProtectedRoute>
                  <ListOrder />
                </ProtectedRoute>
              }
            />

            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/productList"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/nuevoProducto"
              element={
                <ProtectedRoute>
                  <Newproduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/yo"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/yo/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/password/update"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        {!loading && (!isAuthenticated || user.role !== "admin") && (
          <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
