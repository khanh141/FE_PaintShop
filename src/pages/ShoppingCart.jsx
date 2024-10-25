import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/CardReducer'; 
import { Table, Image, Button } from 'react-bootstrap';
import axios from 'axios';

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const decode = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  

  useEffect(() => {
    const loadProducts = async () => {  
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const tenDangNhap = decode(token)?.sub;
        console.log(tenDangNhap);
        if (!tenDangNhap) {
          throw new Error('Không tìm thấy tên đăng nhập từ token');
        }

        const response = await axios.post(`http://localhost:8080/gioHang/xemChiTiet/${tenDangNhap}`,
          {},
          {
          headers: {
            Authorization: `Bearer ${token}` 
        }
        });
        console.log('Dữ liệu sản phẩm từ API:', response.data);
        setProducts(response.data);  
        dispatch(setFilter(response.data));

      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts(); 
  }, [dispatch]);

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: Math.max(newQuantity, 1) }));
  };

  const handleIncreaseQuantity = (productId) => {
    const product = products.find(p => p.id === productId);
    dispatch(updateQuantity({ productId, quantity: product.soLuong + 1 }));
  };

  const handleDecreaseQuantity = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product.quantity > 1) {
      dispatch(updateQuantity({ productId, quantity: product.soLuong - 1 }));
    }
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.gia * product.soLuong, 0);
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
          {products.map( product => (
            <tr key={product.id}>
              <td>
                <Image src={product.image} width={50} height={50} />
              </td>
              <td>{product.ten}</td>
              <td>{product.gia} đ</td>
              <td>
                <Button variant="outline-secondary" onClick={() => handleDecreaseQuantity(product.id)}>-</Button>
                <input
                  type="number"
                  value={product.soLuong}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                  style={{ width: '60px', textAlign: 'center', margin: '0 10px' }}
                />
                <Button variant="outline-secondary" onClick={() => handleIncreaseQuantity(product.id)}>+</Button>
              </td>
              <td>{(product.gia * product.soLuong)} đ</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>Tổng tiền: {calculateTotal().toLocaleString('vi-VN')} đ</p>
      <Button variant="primary">Thanh toán</Button>
    </div>
  );
}
