import React from 'react'
import ProductsContainer from '../components/Products';
import ImageSlides from '../components/ImageSlides';

export default function Home() {
  const slideImgStyles = {
    borderRadius: '10px',
  };

  return (
    <div className="homePage container">
      <ImageSlides
        height="400px" width='100%' interval={null} imgStyles={slideImgStyles}
      />
      <ProductsContainer />
    </div>
  );
}