// // import React, { useState } from 'react';
// // import { Table, Image, Button } from 'react-bootstrap';

// // export default function ShoppingCart() {
// //   const [products, setProducts] = useState([
// //     { id: 1, name: 'Táo', price: 20000, quantity: 2, image: '/images/product.jpg' },
// //     // ... các sản phẩm khác
// //   ]);

// //   const handleQuantityChange = (productId, newQuantity) => {
// //     // Cập nhật số lượng sản phẩm và tính lại tổng tiền
// //   };

// //   const calculateTotal = () => {
// //     // Tính tổng tiền của tất cả các sản phẩm
// //   };

// //   return (
// //     <div>
// //       {/* <h1>hello</h1> */}
// //       <Table striped bordered hover>
// //         <thead>
// //           <tr>
// //             <th>Hình ảnh</th>
// //             <th>Sản phẩm</th>
// //             <th>Giá</th>
// //             <th>Số lượng</th>
// //             <th>Tổng tiền</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {products.map(product => (
// //             <tr key={product.id}>
// //               <td>
// //               <Image src={product.image}  />
// //               </td>
// //               <td>
// //                  {product.name}
// //               </td>
// //               <td>{product.price}</td>
// //               <td>
// //                 <input type="number" value={product.quantity} onChange={(e) => handleQuantityChange(product.id, e.target.value)} />
// //               </td>
// //               <td>{product.price * product.quantity}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </Table>
// //       <p>Tổng tiền: {calculateTotal()}</p>
// //       <Button variant="primary">Thanh toán</Button>
// //     </div>
// //   );
// // }


// import React, { useState } from 'react';
// import { Table, Image, Button } from 'react-bootstrap';

// export default function ShoppingCart() {
//   const [products, setProducts] = useState([
//     { id: 1, name: 'Táo', price: 20000, quantity: 2, image: '/images/product.jpg' },
//     // ... các sản phẩm trong giỏ hàng
//   ]);

//   const allProducts = [
//     { id: 1, name: 'Táo', price: 20000, image: '/images/product.jpg' },
//     { id: 2, name: 'Chuối', price: 15000, image: '/images/banana.jpg' },
//     { id: 3, name: 'Xoài', price: 25000, image: '/images/mango.jpg' },
//     // ... các sản phẩm có thể mua
//   ];

//   const handleQuantityChange = (productId, newQuantity) => {
//     setProducts(products.map(product =>
//       product.id === productId ? { ...product, quantity: Math.max(newQuantity, 1) } : product
//     ));
//   };

//   const handleIncreaseQuantity = (productId) => {
//     setProducts(products.map(product =>
//       product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
//     ));
//   };

//   const handleDecreaseQuantity = (productId) => {
//     setProducts(products.map(product =>
//       product.id === productId && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
//     ));
//   };

//   const calculateTotal = () => {
//     return products.reduce((total, product) => total + product.price * product.quantity, 0);
//   };

//   const addToCart = (product) => {
//     const existingProduct = products.find(p => p.id === product.id);
//     if (existingProduct) {
//       // Sản phẩm đã tồn tại trong giỏ hàng, chỉ cần tăng số lượng
//       setProducts(products.map(p =>
//         p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
//       ));
//     } else {
//       // Sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng với số lượng 1
//       setProducts([...products, { ...product, quantity: 1 }]);
//     }
//   };

//   return (
//     <div>
//       <h2>Giỏ hàng</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Hình ảnh</th>
//             <th>Sản phẩm</th>
//             <th>Giá</th>
//             <th>Số lượng</th>
//             <th>Tổng tiền</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product.id}>
//               <td>
//                 <Image src={product.image} width={50} height={50} />
//               </td>
//               <td>{product.name}</td>
//               <td>{product.price.toLocaleString('vi-VN')} đ</td>
//               <td>
//                 <Button variant="outline-secondary" onClick={() => handleDecreaseQuantity(product.id)}>-</Button>
//                 <input
//                   type="number"
//                   value={product.quantity}
//                   onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
//                   style={{ width: '60px', textAlign: 'center', margin: '0 10px' }}
//                 />
//                 <Button variant="outline-secondary" onClick={() => handleIncreaseQuantity(product.id)}>+</Button>
//               </td>
//               <td>{(product.price * product.quantity).toLocaleString('vi-VN')} đ</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <p>Tổng tiền: {calculateTotal().toLocaleString('vi-VN')} đ</p>
//       <Button variant="primary">Thanh toán</Button>
//     </div>
//   );
// }

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/CardReducer'; 
import { Table, Image, Button } from 'react-bootstrap';

export default function ShoppingCart() {
  const products = useSelector((state) => state.cart.items); // Lấy danh sách sản phẩm từ Redux
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: Math.max(newQuantity, 1) }));
  };

  const handleIncreaseQuantity = (productId) => {
    const product = products.find(p => p.id === productId);
    dispatch(updateQuantity({ productId, quantity: product.quantity + 1 }));
  };

  const handleDecreaseQuantity = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product.quantity > 1) {
      dispatch(updateQuantity({ productId, quantity: product.quantity - 1 }));
    }
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <div>
      <h2>Giỏ hàng</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                <Image src={product.image} width={50} height={50} />
              </td>
              <td>{product.name}</td>
              <td>{product.price.toLocaleString('vi-VN')} đ</td>
              <td>
                <Button variant="outline-secondary" onClick={() => handleDecreaseQuantity(product.id)}>-</Button>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                  style={{ width: '60px', textAlign: 'center', margin: '0 10px' }}
                />
                <Button variant="outline-secondary" onClick={() => handleIncreaseQuantity(product.id)}>+</Button>
              </td>
              <td>{(product.price * product.quantity).toLocaleString('vi-VN')} đ</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>Tổng tiền: {calculateTotal().toLocaleString('vi-VN')} đ</p>
      <Button variant="primary">Thanh toán</Button>
    </div>
  );
}
