import React, { useState } from 'react';
import '../styles/CheckoutModal.css';

function CheckoutModal({ isOpen, onClose, cartItems, totalAmount }) {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Checkout Summary</h2>
        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.name} x {item.quantity || 1}</span>
              <span>₹{item.price * (item.quantity || 1)}</span>
            </div>
          ))}
          <div className="summary-total">
            <span>Total Amount:</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <div className="payment-methods">
          <h3>Select Payment Method</h3>
          <div className="payment-options">
            <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Credit/Debit Card</span>
            </label>
            <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>UPI</span>
            </label>
            <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="proceed-btn" onClick={() => console.log('Processing payment...')}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;