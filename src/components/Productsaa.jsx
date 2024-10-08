import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card.jsx';
import FilterBar from './FilterBar.jsx';
import PaintType from './PaintType.jsx';
import { setShowAll, setFilter } from './redux/ProductReducer';
// import { setShowAll, setFilter } from './redux/action';

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const filteredProducts = useSelector((state) => state.products.filteredProducts);
  const displayedCards = useSelector((state) => state.products.displayedCards);

  const handleShowAll = () => {
    dispatch(setShowAll());
  };

  const handleFilterChange = (filteredData) => {
    dispatch(setFilter(filteredData));
  };

  return (
    <div className="productList">
      <FilterBar products={products} onFilterChange={handleFilterChange} />
      <PaintType className="" type={"Nước sơn"}/>
      <hr />
      <div className="row">
        {filteredProducts.slice(0, displayedCards).map((product, index) => (
          <div  key={index}>
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
        {displayedCards < filteredProducts.length && (
          <button className="btn btn-primary w-25 mt-5" onClick={handleShowAll}>
            Xem tất cả ({filteredProducts.length - displayedCards} sản phẩm)
          </button>
        )}
      </div>
    </div>
  );
}

export default Products;
