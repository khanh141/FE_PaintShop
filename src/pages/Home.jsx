import React from 'react'
import ProductsContainer from '../components/Products';
import Info from '../components/Info'

export default function Home() {
    return (
      <div className="homePage container">
        <Info />
          <ProductsContainer />
      </div>
    );
}