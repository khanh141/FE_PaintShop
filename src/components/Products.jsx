import React, { useState } from 'react';
import testDataInFile from '../testData.json';
import Card from '../components/Card';
import FilterBar from './FilterBar.jsx';
import PaintType from './PaintType.jsx';

function Products() {
  const testData = testDataInFile;
  const [displayedCards, setDisplayedCards] = useState(8);
  const [filteredProducts, setFilteredProducts] = useState(testData);

  const handleShowAll = () => {
    setDisplayedCards(testData.length);
  };

  const handleFilterChange = (filteredData) => {
    setFilteredProducts(filteredData);
  };

  return (
    <div className="productList">
      <FilterBar products={testData} onFilterChange={handleFilterChange} />
      <PaintType className="" type={"Nước sơn"} />
      <hr />
      <div className="row">
        {testData.slice(0, displayedCards).map((product, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3" key={index}>
            <Card
              image={product.image}
              name={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              promotion={product.promotion}
              rating={product.rating}
              reviews={product.reviews}
              offer={product.offer}
            />
          </div>
        ))}
      </div>
      <div className="row justify-content-center">
        {displayedCards < testData.length && (
          <button className="btn btn-primary w-25 mt-5" onClick={handleShowAll}>
            Xem tất cả ({testData.length - displayedCards} sản phẩm)
          </button>
        )}
      </div>
    </div>
  );

}

export default Products;
