// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../assets/css/Table.scss';
import { Button, Modal } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { KEYS } from '~/constants/keys';
import { loadOrder } from '~/services';
import React, { useEffect, useState } from 'react';

function createData(name, trackingId, date, status) {
    return { name, trackingId, date, status };
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${seconds}:${minutes}:${hours} ${day}/${month}/${year}`;
}

const makeStyle = (status) => {
    if (status === 'Đang Giao Hàng') {
        return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
        };
    } else if (status === 'Pending') {
        return {
            background: '#ffadad8f',
            color: 'red',
        };
    } else {
        return {
            background: '#59bfff',
            color: 'white',
        };
    }
};

export default function BasicTable() {
    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);

    const handleShowDetails = (prod) => {
        setSelectedProductDetails(prod);
        setShowDetailModal(true);
    };
    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedProductDetails(null);
    };

    const { data, isLoading, refetch } = useQuery({
        queryKey: [KEYS.GET_ALL_ORDER],
        queryFn: () => loadOrder(),
        staleTime: 1000 * 60 * 5,
    });

    console.log(data);

    return (
        <div className="Table">
            <h3 className="mt-4">Đơn hàng gần đây</h3>
            <TableContainer
                component={Paper}
                style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="left">Mã Đơn Hàng</TableCell>
                            <TableCell align="left">Thời Điểm</TableCell>
                            <TableCell align="left">Trạng Thái</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: 'white' }}>
                        {data?.data?.map((prod, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">
                                    {prod.maDonHang}
                                </TableCell>
                                <TableCell align="left">
                                    {formatDate(prod.thoiDiem)}
                                </TableCell>
                                <TableCell align="left">
                                    <span
                                        className="status"
                                        style={makeStyle(prod.trangThai)}
                                    >
                                        {prod.trangThai === 'Cho_Duyet'
                                            ? 'Chờ Duyệt'
                                            : prod.trangThai}
                                    </span>
                                </TableCell>
                                <TableCell align="left" className="Details">
                                    <Button
                                        onClick={() => handleShowDetails(prod)}
                                    >
                                        Chi Tiết
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Detail Modal */}
            <Modal
                show={showDetailModal}
                onHide={handleCloseDetailModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết phiếu xuất </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProductDetails && (
                        <div>
                            <h5 className="my-3">Thông tin khách hàng</h5>
                            <p>
                                <strong>Số điện thoại:</strong>{' '}
                                {selectedProductDetails.soDienThoai}
                            </p>
                            <p>
                                <strong>Họ tên:</strong>{' '}
                                {selectedProductDetails.ten}
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong>{' '}
                                {selectedProductDetails.diaChi}
                            </p>
                            <p>
                                <strong>Email:</strong>{' '}
                                {selectedProductDetails.email ||
                                    'Chưa có thông tin'}
                            </p>
                            <hr />
                            <h5>Chi Tiết Sản Phẩm Mua</h5>

                            {selectedProductDetails.sanPhamResDtos.map(
                                (product, index) => (
                                    <div
                                        key={index}
                                        style={{ marginBottom: '1rem' }}
                                        className="sanPhamMuaList"
                                    >
                                        <hr />
                                        {product.chiTietSanPhamResList.map(
                                            (detail, detailIndex) => (
                                                <div
                                                    key={detailIndex}
                                                    style={{
                                                        marginLeft: '1rem',
                                                    }}
                                                    className="chiTietSanPhamMuaist"
                                                >
                                                    <p>
                                                        <strong>
                                                            Loại bao bì:
                                                        </strong>{' '}
                                                        {detail.loaiBaoBi}
                                                    </p>
                                                    <p>
                                                        <strong>Màu:</strong>{' '}
                                                        {detail.mau}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Định mức lý thuyết:
                                                        </strong>{' '}
                                                        {
                                                            detail.loaiDinhMucLyThuyet
                                                        }
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Giá tiền:
                                                        </strong>{' '}
                                                        {detail.giaTien.toLocaleString()}{' '}
                                                        VND
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Số lượng:
                                                        </strong>{' '}
                                                        {detail.soLuong}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseDetailModal}
                    >
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
