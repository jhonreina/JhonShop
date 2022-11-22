
import './App.css';
import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/products/ProductDetails'
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

  
function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  },[])
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
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
