import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setShowAll } from '../redux/ProductReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Container } from 'react-bootstrap';
import Card from './Card';
import axios from 'axios';
import testDataInFile from '../testData.json';
import Pagination from "react-bootstrap/Pagination";
// const ProductsContainer = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.filteredProducts);
//   const displayedCards = useSelector((state) => state.products.displayedCards);
//   const showAll = useSelector((state) => state.products.showAll);
//   const [Searchreq, setSearchTerm] = useState("");

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/sanPham/layTatCa"
//         );
//         console.log("Dữ liệu sản phẩm từ API:", response.data);
//         dispatch(setFilter(response.data));
//       } catch (error) {
//         console.error("Error loading products:", error);
//       }
//     };
//     loadProducts();
//   }, [dispatch]);

//   const handleSearch = async () => {
//     if (!Searchreq.trim()) return;
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/sanPham/timKiem?Searchreq=${Searchreq}`
//       );
//       console.log("Dữ liệu sản phẩm: " + response.data);
//       dispatch(setFilter(response.data));
//     } catch (error) {
//       console.error("Error searching products:", error);
//     }
//   };
//   const displayedProducts = products.slice(0, displayedCards);

//   return (
//     <div className='container'>
//       {/* <div className="filter-bar">
//           <div className="mb-3 w-50 mx-auto align-items-center">
//             <div className="row mb-3">
//               <div className="col-12 col-md-9">
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   placeholder="Tìm kiếm theo tên"
//                   // value={ten}
//                 />
//               </div>
//               <div className="col-12 col-md-3 mb-3">
//                 <button className="btn btn-primary w-100">Tìm kiếm</button>
//               </div>
//             </div>
//             {ten && (
//               <button className="btn btn-secondary w-100">Xóa tìm kiếm</button>
//             )}
//           </div>
//         </div> */}

//       <div className="my-3 w-50 mx-auto align-items-center searchInput">
//         <div className="row mb-3">
//           <div className="col-12 col-md-9">
//             <input
//               type="text"
//               className="form-control mb-2"
//               placeholder="Tìm kiếm theo tên"
//               value={Searchreq}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="col-12 col-md-3 mb-3">
//             <button className="btn btn-primary w-100" onClick={handleSearch}>
//               Tìm kiếm
//             </button>
//           </div>
//         </div>
//       </div>
//       <Row>
//         {products.map((product) => (
//           <Col sm={6} md={4} lg={3} xl={3}>
//             {/* <Card 
//               image={product.hinhAnh} // Giữ nguyên hình ảnh sản phẩm
//                 name={product.ten} // Tên sản phẩm giống nhau cho tất cả card
//                 type={product.loai}
//                 tinhnang={product.tinhNang} // Tính năng của từng chi tiết sản phẩm
//                 mota={product.moTa} // Mô tả riêng cho mỗi chi tiết sản phẩm
//                 giatien={product. chiTietSanPhamResList[0]?.giaTien} // Giá tiền của từng chi tiết sản phẩm
//                 soluong={product. chiTietSanPhamResList[0]?soLuong}
//                 /> */}

//             <Card
//               id={product.maSanPham}
//               image={product.hinhAnh}
//               name={product.ten}
//               type={product.loai}
//               tinhnang={product.tinhNang}
//               mota={product.moTa}
//               giatien={product.chiTietSanPhamResList[0]?.giaTien}
//               soluong={product.chiTietSanPhamResList[0]?.soLuong}
//             />
//           </Col>
//         ))}

//         {/* {products.map((product) =>
//           // Lặp qua từng chi tiết sản phẩm của mỗi sản phẩm
//           product.chiTietSanPhamResList.map((chiTiet, index) => (
//             <Col
//               sm={6}
//               md={4}
//               lg={3}
//               xl={3}
//               // key={`${product.ten}-${index}`}
//               className="mb-4"
//             >
//               <Card
//                 image={product.hinhAnh} // Giữ nguyên hình ảnh sản phẩm
//                 name={product.ten} // Tên sản phẩm giống nhau cho tất cả card
//                 type={product.loai}
//                 tinhnang={product.tinhNang} // Tính năng của từng chi tiết sản phẩm
//                 mota={product.moTa} // Mô tả riêng cho mỗi chi tiết sản phẩm
//                 giatien={chiTiet.giaTien} // Giá tiền của từng chi tiết sản phẩm
//                 soluong={chiTiet.soLuong}
//                 mausac={chiTiet.mau}
//               />
//             </Col>
//           ))
//         )} */}
//       </Row>

//       {!showAll && (
//         <div className="d-flex justify-content-center">
//           <Button onClick={() => dispatch(setShowAll())}>Xem tất cả</Button>
//         </div>
//       )}
//     </div>
//   );
// };
const PRODUCTS_PER_PAGE = 12;

function ProductsContainer() {
  const testData = testDataInFile;
  const [displayedCards, setDisplayedCards] = useState(8);
  const [filteredProducts, setFilteredProducts] = useState(testData);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(testData.length / PRODUCTS_PER_PAGE);
  const currentProducts = testData.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );
  const handlePageChange = (page) => setCurrentPage(page);

  const handleFilterChange = (filteredData) => {
    setFilteredProducts(filteredData);
  };
  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };
  return (
    <Container className="productList">
      {/* <FilterBar products={testData} onFilterChange={handleFilterChange} /> */}
      {/* <PaintType className="" type={"Nước sơn"} /> */}
      <hr />
      <Row className="row">
        {currentProducts.map((product, index) => (
          <Col className="col-sm-6 col-md-4 col-lg-3 col-xl-3" key={index}>
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
      {/* React-Bootstrap Pagination */}
      <Row className="justify-content-center mt-4">
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {renderPaginationItems()}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </Row>
    </Container>
  );

}

export default ProductsContainer;