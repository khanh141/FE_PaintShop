import React from 'react'
import { Button, Col, Table } from 'react-bootstrap';
import ModalAddProduct from '~/components/ModalAddProduct';
import UpdateProductModal from '~/components/UpdateProductModal';

function AdminExportForm() {
    return (
        <Col sm={12} md={12} lg={10} xl={10}>
            <h1 className="text-center mb-5">Quản Lý Sản Phẩm</h1>
            <div>
                <Button
                    className="mt-4 rounded"
                // onClick={() => setIsShowModalAddProduct(true)}
                >
                    Tạo phiếu nhập
                </Button>
                <div
                    style={{
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        width: '100%',
                    }}
                >
                    <Table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                        }}
                    >
                        <thead>
                            <tr>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                    }}
                                >STT</th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                    }}
                                > Mã phiếu nhập</th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                    }}
                                >Thời điểm</th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                    }}
                                >
                                    Lý do
                                </th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                    }}
                                >Tổng tiền</th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                    }}
                                >Số điện thoại khách</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {!isLoading &&
                                data?.data?.map((prod, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{prod.ten}</td>
                                        <td>{prod.loai}</td>
                                        <td>{prod.tenNhaSanXuat}</td>
                                        <td>
                                            <Button
                                                className="rounded"
                                                variant="info"
                                            >
                                                Chi Tiết
                                            </Button>
                                        </td>

                                        <td>
                                            <Button
                                                className="rounded"
                                                variant="info"
                                                onClick={() =>
                                                    handleUpdateProductClick(
                                                        prod
                                                    )
                                                }
                                            >
                                                Cập Nhật
                                            </Button>
                                        </td>
                                    </tr>
                                ))} */}
                        </tbody>
                    </Table>
                </div>
                <UpdateProductModal
                // show={isShowModalUpdateProduct}
                // onHide={() => setIsShowModalUpdateProduct(false)} // Đổi tên prop từ handleClose thành onHide
                // productData={selectedProduct} // Truyền dữ liệu sản phẩm đã chọn
                // onSave={(updatedProduct) => {
                //     // Xử lý khi lưu sản phẩm đã cập nhật
                //     console.log('Updated Product:', updatedProduct);
                //     setIsShowModalUpdateProduct(false);
                // }}
                />

                <ModalAddProduct
                // show={isShowModalAddProduct}
                // onHide={() => setIsShowModalAddProduct(false)}
                // onSubmit={handleAddProduct}
                />
            </div>
        </Col>
    )
}

export default AdminExportForm