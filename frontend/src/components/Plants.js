import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Plants.css';

function Plants() {
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState(null);

  const plantProducts = [
    {
      id: 'p1',
      name: 'Snake Plant',
      price: 599,
      image: '/images/plants/snake-plant.jpg',
      category: 'Indoor Plants',
      description: 'Air purifying, Low maintenance'
    },
    {
      id: 'p2',
      name: 'Bamboo Plant Set',
      price: 899,
      image: '/images/plants/bamboo-set.jpg',
      category: 'Lucky Plants',
      description: 'Brings prosperity, Easy care'
    },
    {
      id: 'p3',
      name: 'Herb Garden Kit',
      price: 1299,
      image: '/images/plants/herb-kit.jpg',
      category: 'Gardening',
      description: 'Grow your own herbs'
    },
    {
      id: 'p4',
      name: 'Succulent Collection',
      price: 799,
      image: '/images/plants/succulents.jpg',
      category: 'Indoor Plants',
      description: 'Set of 4 unique succulents'
    }
  ];

  const handleAddToCart = (item) => {
    setAddingToCart(item.id);
    addToCart(item);
    setTimeout(() => setAddingToCart(null), 800);
  };

  return (
    <div className="plants-container">
      <h1>Plants & Gardening</h1>
      
      <div className="category-filters">
        <button className="filter-btn active">All Plants</button>
        <button className="filter-btn">Indoor Plants</button>
        <button className="filter-btn">Outdoor Plants</button>
        <button className="filter-btn">Gardening Tools</button>
      </div>

      <div className="plants-grid">
        {plantProducts.map(plant => (
          <div key={plant.id} className="plant-card">
            <img src={plant.image} alt={plant.name} />
            <div className="plant-info">
              <span className="plant-category">{plant.category}</span>
              <h3>{plant.name}</h3>
              <p className="description">{plant.description}</p>
              <p className="price">₹{plant.price}</p>
              <button 
                onClick={() => handleAddToCart(plant)}
                className={`add-to-cart-btn ${addingToCart === plant.id ? 'adding' : ''}`}
              >
                {addingToCart === plant.id ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plants;