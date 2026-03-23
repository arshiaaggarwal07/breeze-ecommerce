import React, { useState, useEffect } from 'react';
import '../styles/Slideshow.css';

function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/images/slideshow/slide1.jpg",
      text: "Shop Sustainably, Live Green"
    },
    {
      image: "/images/slideshow/slide2.jpg",
      text: "Eco-Friendly Products Just for You"
    },
    {
      image: "/images/slideshow/slide3.jpg",
      text: "Every Purchase Makes a Difference"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`slide fade ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={slide.image} alt={`Slide ${index + 1}`} />
          <div className="text">{slide.text}</div>
        </div>
      ))}
    </div>
  );
}

export default Slideshow;