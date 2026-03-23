import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Add this import
import searchService from '../services/searchService';
import '../styles/Navbar.css';

function Navbar() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart(); // Add this line

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <Link to="/">BreeZe</Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/plants">Plants & Gardening</Link></li>
          <li className="dropdown">
            <Link to="/clothing">Clothing</Link>
            <ul className="dropdown-menu">
              <li><Link to="/clothing/tshirts">T-Shirts</Link></li>
              <li><Link to="/clothing/jeans">Jeans</Link></li>
              <li><Link to="/clothing/jackets">Jackets</Link></li>
              <li><Link to="/clothing/dresses">Dresses</Link></li>
            </ul>
          </li>
          <li><Link to="/home">Home & Living</Link></li>
          <li><Link to="/artisan">Artisan Picks</Link></li>
        </ul>

        <div className="nav-right">
          <div className="currency-selector">
            <span className="currency-symbol">₹</span>
            <span className="currency-code">IN</span>
            <span className="currency-arrow">▼</span>
            
            <div className="currency-dropdown">
              <div className="currency-option active">
                <span>₹ INR</span>
              </div>
              <div className="currency-option">
                <span>$ USD</span>
              </div>
              <div className="currency-option">
                <span>€ EUR</span>
              </div>
              <div className="currency-option">
                <span>£ GBP</span>
              </div>
            </div>
          </div>
          <Link to="/login">Account</Link>
          <div className="search-container">
            <img 
              src="/images/search.png" 
              alt="Search" 
              className={`search-icon ${isSearchActive ? 'active' : ''}`}
              onClick={toggleSearch}
            />
            <form className={`search-form ${isSearchActive ? 'active' : ''}`}>
              <input
                type="text"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
          </div>
          <Link to="/cart" className="cart-link">
            <img src="/images/cart.png" alt="Cart" className="icon" />
            {cartItems && cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;