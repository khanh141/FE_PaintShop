import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchProducts,
  increaseProductQuantity,
  decreaseProductQuantity,
  toggleSelectAll,
  toggleCheckbox,
  removeProductFromCart
} from '../redux/CardReducer.js';
import { Table, Image, Button, Container, Row, Col } from 'react-bootstrap';
import ConfirmationModal from '~/components/ConfirmationModal.jsx';

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const { products, selectAll } = useSelector((state) => state.cart);
  const tenDangNhap = useSelector((state) => state.user.tenDangNhap);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (tenDangNhap) {
      dispatch(fetchProducts(tenDangNhap));
    }
  }, [dispatch, tenDangNhap]);

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return product.isChecked ? total + product.chiTietSanPham.giaTien * product.soLuong : total;
    }, 0);
  };

  const handlePurchase = () => {
    const anyProductChecked = products.some((product) => product.isChecked);

    if (!anyProductChecked) {
      toast.error('Bạn vẫn chưa chọn sản phẩm nào để mua', {
        position: 'top-right',
        autoClose: 3000,
      });
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 4000);
      return;
    }
    navigate('/purchase');
  };

  const handleRowClick = (product) => {
    dispatch(toggleCheckbox({
      maSanPham: product.maSanPham,
      mau: product.chiTietSanPham.mau,
      loaiBaoBi: product.chiTietSanPham.loaiBaoBi,
    }));
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleConfirmRemove = (product) => {
    dispatch(removeProductFromCart(product, tenDangNhap));
    setModalOpen(false);
  };

  return (
    <Container className='mt-4 cartContainer'>
      <h2>Giỏ hàng</h2>
      <Table striped hover id='cartTable'>
        <thead>
          <tr>
            <th className='checkBoxCol'>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={() => dispatch(toggleSelectAll())}
              />
            </th>
            <th className='imageCol'></th>
            <th className='tenCol'>Sản phẩm</th>
            <th className='giaTienCol'>Giá</th>
            <th className='soLuongCol'>Số lượng</th>
            <th className='tongTienCol'>Tổng tiền</th>
            <th className='thaoTacCol'>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={`${product.id}-${index}`} onClick={() => handleRowClick(product)} style={{ cursor: 'pointer' }}>
              <td className='checkBoxCol'>
                <input
                  type="checkbox"
                  checked={product.isChecked || false}
                  onChange={(e) => e.stopPropagation()}
                />
              </td>
              <td className='imageCol'>
                <Image src={product.image} width={50} height={50} />
              </td>
              <td className='tenCol'>
                <div>
                  <span className='tenSanPham'>{product.ten}</span>
                  <div className='chiTietSanPham'>
                    <small>{product.chiTietSanPham.loaiBaoBi}</small>
                    <small>{product.chiTietSanPham.loaiDinhMucLyThuyet}</small>
                    <small>{product.chiTietSanPham.mau}</small>
                  </div>
                </div>

              </td>
              <td className='giaTienCol'>{product.chiTietSanPham.giaTien.toLocaleString('vi-VN')} đ</td>
              <td className='soLuongCol'>
                <div style={{ display: 'inline-block', textAlign: 'center', margin: '0 10px' }}>
                  <Button
                    style={{ border: 'none' }}
                    variant="outline-secondary"
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn chặn sự kiện nhấp chuột tràn xuống hàng
                      dispatch(decreaseProductQuantity(product, tenDangNhap));
                    }}
                  >
                    -
                  </Button>
                  <span>{product.soLuong}</span>
                  <Button
                    style={{ border: 'none' }}
                    variant="outline-secondary"
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn chặn sự kiện nhấp chuột tràn xuống hàng
                      dispatch(increaseProductQuantity(product, tenDangNhap));
                    }}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td className='tongTienCol'>{(product.chiTietSanPham.giaTien * product.soLuong).toLocaleString('vi-VN')} đ</td>
              <td className="thaoTacCol">
                <span
                  className="xoaSanPham"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal();
                  }}
                >
                  Xóa
                </span>

                <ConfirmationModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  onConfirm={() => handleConfirmRemove(product)}
                  message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
                />
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
      <Col className="justify-content-end sumMoneyContainer">
        <div md={3} className="text-right">
          <span>Tổng cộng: <strong className='priColorText'>{calculateTotal().toLocaleString('vi-VN')}</strong> đ</span>
          <Button
            className='priColor'
            onClick={handlePurchase}
            disabled={isButtonDisabled}
          >Mua hàng</Button>
        </div>
      </Col>
    </Container>
  );
}
