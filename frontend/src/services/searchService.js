const searchProducts = async (query) => {
  try {
    const response = await fetch(`http://localhost:5000/api/products/search?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

const searchService = {
  searchProducts
};

export default searchService;