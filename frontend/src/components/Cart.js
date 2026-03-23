import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';
import '../styles/Cart.css';

function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  
  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-list">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-checkbox">
                <input type="checkbox" checked readOnly />
              </div>
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="ref-number">Ref: {item.id}</p>
                <div className="item-controls">
                  <div className="size-selector">
                    <label>Size: </label>
                    <select defaultValue={item.size}>
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                  </div>
                  <div className="quantity-selector">
                    <label>Qty: </label>
                    <select defaultValue={item.quantity}>
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="item-price">
                <div className="current-price">₹{item.price}</div>
                {item.originalPrice && (
                  <div className="original-price">₹{item.originalPrice}</div>
                )}
              </div>
              <button 
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="delivery-info">
            <span className="delivery-icon">🚚</span>
            Estimated delivery by {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </div>
        </div>
      )}
      
      <div className="checkout-section">
        <div className="cart-total">
          Total:<span className="total-amount">₹{totalAmount}</span>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalAmount={totalAmount}
      />
    </div>
  );
}

export default Cart;