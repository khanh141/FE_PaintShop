import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchProducts,
  increaseProductQuantity,
  decreaseProductQuantity,
  toggleSelectAll,
  toggleCheckbox,
} from '../redux/CardReducer.js';
import { Table, Image, Button, Container,Row,Col } from 'react-bootstrap';

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const { products, selectAll } = useSelector((state) => state.cart);
  const tenDangNhap = useSelector((state) => state.user.tenDangNhap);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProducts(tenDangNhap));
  }, [dispatch, tenDangNhap]);

  // const calculateTotal = () => {
  //   return products.reduce((total, product) => total + product.gia * product.soLuong, 0);
  // };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return product.isChecked ? total + product.gia * product.soLuong : total;
    }, 0);
  };
  
  const handlePurchase = () => {
    navigate('/purchase');
  };

  return (
    <Container>
      <h2>Giỏ hàng</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={() => dispatch(toggleSelectAll())}
              />
            </th>
            <th>Hình ảnh</th>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <input
                  type="checkbox"
                  checked={product.isChecked || false}
                  onChange={() => dispatch(toggleCheckbox({ 
                    maSanPham: product.maSanPham, 
                    mau: product.chiTietSanPham.mau,
                    loaiBaoBi: product.chiTietSanPham.loaiBaoBi
                }))}
                />
              </td>
              <td>
                <Image src={product.image} width={50} height={50} />
              </td>
              <td>{product.ten}</td>
              <td>{product.gia.toLocaleString('vi-VN')} đ</td>
              <td>
                <div style={{ display: 'inline-block', textAlign: 'center', margin: '0 10px' }}>
                  <Button
                    style={{ border: 'none' }}
                    variant="outline-secondary"
                    onClick={() => dispatch(decreaseProductQuantity(product, tenDangNhap))} // Gọi đúng hàm
                  >
                    -
                  </Button>
                  <span>{product.soLuong}</span>
                  <Button
                    style={{ border: 'none' }}
                    variant="outline-secondary"
                    onClick={() => dispatch(increaseProductQuantity(product, tenDangNhap))} // Gọi đúng hàm
                  >
                    +
                  </Button>
                </div>
              </td>
              <td>{(product.gia * product.soLuong).toLocaleString('vi-VN')} đ</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="justify-content-end">
        <Col md={3} className="text-right">
          <h4>Tổng cộng: {calculateTotal().toLocaleString('vi-VN')} đ</h4>
          <Button  onClick={handlePurchase} >Mua hàng</Button>
        </Col>
      </Row>
    </Container>
  );
}

  
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//   fetchProducts,
//   increaseProductQuantity,
//   decreaseProductQuantity,
//   toggleSelectAll,
//   toggleCheckbox,
//   setSelectedItemsFromStorage
// } from '../redux/CardReducer.js';
// import { Table, Image, Button, Container, Row, Col } from 'react-bootstrap';

// export default function ShoppingCart() {
//   const dispatch = useDispatch();
//   const { products, selectAll } = useSelector((state) => state.cart);
//   const tenDangNhap = useSelector((state) => state.user.tenDangNhap);
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchProducts(tenDangNhap));
//   }, [dispatch, tenDangNhap]);

//   useEffect(() => {
//     // Load selected products from localStorage on first load
//     const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
//     dispatch(setSelectedItemsFromStorage(selectedItems));
//   }, [dispatch]);

//   useEffect(() => {
//     // Save selected products to localStorage whenever they change
//     const selectedItems = products.filter((product) => product.isChecked);
//     localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
//   }, [products]);

//   const calculateTotal = () => {
//     return products.reduce((total, product) => {
//       return product.isChecked ? total + product.gia * product.soLuong : total;
//     }, 0);
//   };

//   const handlePurchase = () => {
//     navigate('/purchase');
//   };

//   return (
//     <Container>
//       <h2>Giỏ hàng</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>
//               <input
//                 type="checkbox"
//                 checked={selectAll}
//                 onChange={() => dispatch(toggleSelectAll())}
//               />
//             </th>
//             <th>Hình ảnh</th>
//             <th>Sản phẩm</th>
//             <th>Giá</th>
//             <th>Số lượng</th>
//             <th>Tổng tiền</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={product.isChecked || false}
//                   onChange={() => dispatch(toggleCheckbox({ 
//                     maSanPham: product.maSanPham, 
//                     mau: product.chiTietSanPham.mau,
//                     loaiBaoBi: product.chiTietSanPham.loaiBaoBi
//                 }))}/>
//               </td>
//               <td>
//                 <Image src={product.image} width={50} height={50} />
//               </td>
//               <td>{product.ten}</td>
//               <td>{product.gia.toLocaleString('vi-VN')} đ</td>
//               <td>
//                 <div style={{ display: 'inline-block', textAlign: 'center', margin: '0 10px' }}>
//                   <Button
//                     style={{ border: 'none' }}
//                     variant="outline-secondary"
//                     onClick={() => dispatch(decreaseProductQuantity(product, tenDangNhap))}
//                   >
//                     -
//                   </Button>
//                   <span>{product.soLuong}</span>
//                   <Button
//                     style={{ border: 'none' }}
//                     variant="outline-secondary"
//                     onClick={() => dispatch(increaseProductQuantity(product, tenDangNhap))}
//                   >
//                     +
//                   </Button>
//                 </div>
//               </td>
//               <td>{(product.gia * product.soLuong).toLocaleString('vi-VN')} đ</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <Row className="justify-content-end">
//         <Col md={3} className="text-right">
//           <h4>Tổng cộng: {calculateTotal().toLocaleString('vi-VN')} đ</h4>
//           <Button onClick={handlePurchase}>Mua hàng</Button>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
