import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/SearchResults.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      // Search through all product arrays (clothing, plants, etc.)
      const allProducts = [
        // Add your product arrays here
      ];

      const filteredResults = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filteredResults);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="results-grid">
          {results.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default SearchResults;