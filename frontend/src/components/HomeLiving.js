import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/HomeLiving.css';

function HomeLiving() {
  const { addToCart } = useCart();
  const [animatingItems, setAnimatingItems] = useState(new Set());

  // Add product data
  const homeProducts = [
    {
      id: 'hl1',
      name: 'Bamboo Storage Basket',
      price: 599,
      image: '/images/home/bamboo-basket.jpg',
      category: 'Storage',
      description: 'Eco-friendly bamboo storage solution'
    },
    {
      id: 'hl2',
      name: 'Cotton Bed Sheet Set',
      price: 1499,
      image: '/images/home/bedsheet.jpg',
      category: 'Bedding',
      description: 'Premium cotton, 300 thread count'
    },
    {
      id: 'hl3',
      name: 'Ceramic Vase',
      price: 899,
      image: '/images/home/vase.jpg',
      category: 'Decor',
      description: 'Handcrafted ceramic flower vase'
    },
    {
      id: 'hl4',
      name: 'Scented Candle Set',
      price: 799,
      image: '/images/home/candles.jpg',
      category: 'Decor',
      description: 'Set of 3 aromatic candles'
    }
  ];

  const handleAddToCart = (product) => {
    setAnimatingItems(prev => new Set([...prev, product.id]));
    addToCart(product);
    
    setTimeout(() => {
      setAnimatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 800); // Animation duration
  };

  return (
    <div className="home-living">
      <h1>Home & Living</h1>
      <div className="products-grid">
        {homeProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <p className="price">₹{product.price}</p>
              <button 
                onClick={() => handleAddToCart(product)}
                className={animatingItems.has(product.id) ? 'adding-to-cart' : ''}
              >
                {animatingItems.has(product.id) ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeLiving;