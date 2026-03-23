import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import SearchResults from './components/SearchResults';
import Cart from './components/Cart';
import Clothing from './components/Clothing';
import HomeLiving from './components/HomeLiving';
import './styles/App.css';
import Plants from './components/Plants';
import Artisan from './components/Artisan';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/clothing" element={<Clothing />} />
            <Route path="/home" element={<HomeLiving />} />
            <Route path="/plants" element={<Plants />} />
            <Route path="/artisan" element={<Artisan />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
