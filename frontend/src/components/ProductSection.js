import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/ProductSection.css';

function ProductSection() {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      image: "/images/eco-bag.png",
      name: "Eco-friendly Bag",
      price: 799
    },
    {
      image: "/images/bamboo-bottle.jpg",
      name: "Bamboo Bottle",
      price: 499
    },
    {
      image: "/images/straw-set.jpg",
      name: "Reusable Straw Set",
      price: 299
    },
    {
      image: "/images/cotton-tshirt.jpg",
      name: "Organic Cotton T-shirt",
      price: 999,
      description: "Made from 100% organic cotton 🌱, reducing water waste and carbon footprint."
    }
  ];

  return (
    <section className="product-section fade-up">
      <h2>Featured Products</h2>
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-card fade-up">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductSection;