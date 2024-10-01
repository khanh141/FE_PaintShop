import React, { useState, useEffect, useMemo } from 'react';


function FilterBar({ products, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000000); 
  const [minRating, setMinRating] = useState(0); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); 
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const priceMatch = Number(product.price.replace('đ', '')) >= minPrice && Number(product.price.replace('đ', '')) <= maxPrice;
      const ratingMatch = product.rating >= minRating;
      return nameMatch && priceMatch && ratingMatch;
    });
  }, [products, searchTerm, minPrice, maxPrice, minRating]);

  const handlePriceChange = (event) => {
    
    const { name, value } = event.target;
    const numberValue = value === '' ? '' : parseFloat(value);

    if (name === 'minPrice') {
      setMinPrice(numberValue);
    } else if (name === 'maxPrice') {
      setMaxPrice(numberValue);
    }
    
    
  };

  const handleRatingChange = (event) => {
    setMinRating(Number(event.target.value));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setMinPrice(0);
    setMaxPrice(1000000000);
    setMinRating(0);
  };

 

  const handleSearch = () => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    onFilterChange(filteredProducts);
  };
  const handleFocus = (event) => {
    event.target.select();
  };

  useEffect(() => {
    onFilterChange(filteredProducts); 
  }, [filteredProducts, onFilterChange]); 
  
  const Minprice = [
    { value: 0, label: '0đ' },
    { value: 100000, label: 'Trên 100.000đ' },
    { value: 500000, label: 'Trên 200.000đ' },
    { value: 500000, label: 'Trên 500.000đ' },
    { value: 1000000, label: 'Trên 1000.000đ' },
  ];

  const Maxprice = [
    { value: 10000000, label: 'Đến 10.000.000đ' },
    { value: 5000000, label: 'Đến 5.000.000đ' },
    { value: 2000000, label: 'Đến 2.000.000đ' },
    { value: 1000000, label: 'Đến 1.000.000đ' },
    { value: 500000, label: 'Đến 500.000đ' },
  ];

  const rate = [
    { value: 0, label: '0 sao'},
    { value: 1, label: '1 sao'},
    { value: 2, label: '2 sao'},
    { value: 3, label: '3 sao'},
    { value: 4, label: '4 sao'},  
    { value: 5, label: '5 sao'},
  ];


  return (
    <div className="filter-bar">
      <div className="mb-3 w-50 mx-auto align-items-center align-content-center">
        <div className="row mb-3">
          <div className="col-12 col-md-9">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Tìm kiếm theo tên"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-12 col-md-3 mb-3">
            <button className="btn btn-primary w-100" onClick={handleSearch}>
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 mt-2">
          <div className="form-group">
            <label htmlFor="minPrice ">Giá từ:</label>
            <select
              id="minPrice"
              name="minPrice"
              value={minPrice}
              onChange={handlePriceChange}
              className="form-control"
            >
              {Minprice.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-3 mt-2">
          <div className="form-group">
            <label htmlFor="maxPrice">Giá đến:</label>
            <select
              id="maxPrice"
              name="maxPrice"
              value={maxPrice}
              onChange={handlePriceChange}
              className="form-control"
            >
              {Maxprice.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-3 mt-2">
          <div className="form-group">
            <label htmlFor="minRating">Đánh giá từ:</label>
            <select
              id="minRating"
              value={minRating}
              onChange={handleRatingChange}
              className="form-control"
            >
              {rate.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-3 d-flex align-items-end mt-2">
          <button
            className="btn btn-primary w-100"
            onClick={handleClearFilters}
          >
            Xóa Lọc
          </button>
        </div>
      </div>
    </div>
  );


}

export default FilterBar;

