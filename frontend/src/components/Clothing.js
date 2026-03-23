import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import { useCart } from '../context/CartContext';
import { fadeIn, addToCartAnimation, filterAnimation } from '../utils/animations';
import '../styles/Clothing.css';

function Clothing() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFilter, setActiveFilter] = useState('all');
  const [addingToCart, setAddingToCart] = useState(null);
  const { addToCart } = useCart();
  const gridRef = useRef(null);

  const categories = ['All', 'T-Shirts', 'Jeans', 'Dresses', 'Jackets'];

  const clothingItems = [
    {
      id: 'c1',
      name: 'Organic Cotton T-shirt',
      category: 'T-Shirts',
      price: 999,
      image: '/images/clothing/organic-tshirt.jpg',
      tag: 'T-Shirts'
    },
    {
      id: 'c2',
      name: 'Hemp Blend Jeans',
      category: 'Jeans',
      price: 1499,
      image: '/images/clothing/hemp-jeans.jpg',
      tag: 'Jeans'
    },
    {
      id: 'c3',
      name: 'Bamboo Fiber Dress',
      category: 'Dresses',
      price: 1999,
      image: '/images/clothing/bamboo-dress.jpg',
      tag: 'Dresses'
    },
    {
      id: 'c4',
      name: 'Polyester Jacket',
      category: 'Jackets',
      price: 2499,
      image: '/images/clothing/recycled-jacket.jpg',
      tag: 'Jackets'
    }
  ];

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    // Add your filtering logic here
  };

  const handleAddToCart = (item) => {
    setAddingToCart(item.id);
    addToCart(item);
    
    // Reset animation state after 800ms
    setTimeout(() => {
      setAddingToCart(null);
    }, 800);
  };

  return (
    <div className="clothing-container">
      <h1>Sustainable Clothing</h1>
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="filters">
     
      </div>
      <div className="clothing-grid" ref={gridRef}>
        {clothingItems.map(item => (
          <div key={item.id} className="clothing-card">
            <img src={item.image} alt={item.name} />
            <div className="clothing-info">
              <h3>{item.name}</h3>
              <p className="category">{item.category}</p>
              <p className="price">₹{item.price}</p>
              <button 
                onClick={() => handleAddToCart(item)}
                className={`add-to-cart-btn ${addingToCart === item.id ? 'adding' : ''}`}
                disabled={addingToCart === item.id}
              >
                {addingToCart === item.id ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clothing;