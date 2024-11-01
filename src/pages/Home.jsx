import React from 'react'
import ProductsContainer from '../components/Products';
import ImageSlides from '../components/ImageSlides';
import Info from '../components/Info';

export default function Home() {
  const imagesForHomePage = [
    { src: 'images/banner1.jpg', alt: 'Banner 1' },
    { src: 'images/banner2.jpg', alt: 'Banner 2' },
  ];
  return (
    <div className="homePage">
      <ImageSlides
        images={imagesForHomePage}
        height="500px" width='100%' interval={null}
      />
      <ProductsContainer />
      <Info />
    </div>
  );
}