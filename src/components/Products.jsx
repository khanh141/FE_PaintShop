import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter,setShowAll } from '../redux/ProductReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button } from 'react-bootstrap';
import Card from './Card';
import PaintType from './PaintType';

const ProductsContainer = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.filteredProducts);
    const displayedCards = useSelector((state) => state.products.displayedCards);
    const showAll = useSelector((state) => state.products.showAll);

    useEffect(() => {
        fetch('/testData.json')
            .then((response) => response.json())
            .then((data) => {
                dispatch(setFilter(data));
            })
            .catch((error) => console.error('Error loading JSON:', error));
    }, [dispatch]);
    const displayedProducts = products.slice(0, displayedCards);


    return (
      <div>
        {/* <div className="filter-bar">
          <div className="mb-3 w-50 mx-auto align-items-center">
            <div className="row mb-3">
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Tìm kiếm theo tên"
                  // value={searchTerm}
                />
              </div>
              <div className="col-12 col-md-3 mb-3">
                <button className="btn btn-primary w-100">Tìm kiếm</button>
              </div>
            </div>
            {searchTerm && (
              <button className="btn btn-secondary w-100">Xóa tìm kiếm</button>
            )}
          </div>
        </div> */}

        <div className="mb-3 w-50 mx-auto align-items-center">
            <div className="row mb-3">
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Tìm kiếm theo tên"
                  // value={searchTerm}
                />
              </div>
              <div className="col-12 col-md-3 mb-3">
                <button className="btn btn-primary w-100">Tìm kiếm</button>
              </div>
            </div>
        </div>

        <PaintType className="" type={"Nước sơn"} />
        <hr />
        <Row>
          {displayedProducts.map((product) => (
            <Col sm={6} md={4} lg={3} xl={3} key={product.id} className="mb-4">
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
            </Col>
          ))}
        </Row>
        {!showAll && (
          <div className="d-flex justify-content-center">
            <Button onClick={() => dispatch(setShowAll())}>Xem tất cả</Button>
          </div>
        )}
      </div>
    );
};

export default ProductsContainer;