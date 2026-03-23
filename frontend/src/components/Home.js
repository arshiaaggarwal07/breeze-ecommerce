import React from 'react';
import Navbar from './Navbar';
import Slideshow from './Slideshow';
import ProductSection from './ProductSection';

function Home() {
  return (
    <div>
      <Navbar />
      <Slideshow />
      <ProductSection />
    </div>
  );
}

export default Home;