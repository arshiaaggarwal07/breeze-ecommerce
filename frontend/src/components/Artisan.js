import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Artisan.css';

function Artisan() {
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState(null);

  const artisanProducts = [
    {
      id: 'a1',
      name: 'Handwoven Bamboo Basket',
      price: 1299,
      image: '/images/artisan/bamboo-bsk.jpg',
      category: 'Home Decor',
      artisan: 'Local Craftsmen Collective',
      description: 'Traditional weaving techniques'
    },
    {
      id: 'a2',
      name: 'Ceramic Plant Pot',
      price: 899,
      image: '/images/artisan/ceramic-pot.jpg',
      category: 'Pottery',
      artisan: 'Village Pottery Guild',
      description: 'Hand-painted earthenware'
    },
    {
      id: 'a3',
      name: 'Macrame Wall Hanging',
      price: 1499,
      image: '/images/artisan/macrame.jpg',
      category: 'Wall Art',
      artisan: 'Fiber Arts Studio',
      description: 'Handcrafted cotton rope art'
    }
  ];

  const handleAddToCart = (item) => {
    setAddingToCart(item.id);
    addToCart(item);
    setTimeout(() => setAddingToCart(null), 800);
  };

  return (
    <div className="artisan-container">
      <h1>Artisan Picks</h1>
      <p className="artisan-subtitle">Handcrafted with love by local artisans</p>

      <div className="artisan-filters">
        <button className="filter-btn active">All Items</button>
        <button className="filter-btn">Home Decor</button>
        <button className="filter-btn">Pottery</button>
        <button className="filter-btn">Wall Art</button>
      </div>

      <div className="artisan-grid">
        {artisanProducts.map(product => (
          <div key={product.id} className="artisan-card">
            <img src={product.image} alt={product.name} />
            <div className="artisan-info">
              <span className="artisan-category">{product.category}</span>
              <h3>{product.name}</h3>
              <p className="artisan-name">By {product.artisan}</p>
              <p className="description">{product.description}</p>
              <p className="price">₹{product.price}</p>
              <button 
                onClick={() => handleAddToCart(product)}
                className={`add-to-cart-btn ${addingToCart === product.id ? 'adding' : ''}`}
              >
                {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Artisan;