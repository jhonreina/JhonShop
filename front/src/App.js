
import './App.css';
import React from 'react';
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

  
function App() {
  return (
    <Router>
      <div className="App">
        <Header />        
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/producto/:id" element={<ProductDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/listaProductos" element={<ProductList />} />
            <Route path="/nuevoProducto" element={<Newproduct />} />
            <Route path="/search/:keyword" element={<Home/>}/>
            <Route path="/carrito" element={<Cart />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
