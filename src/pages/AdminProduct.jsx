import { useState } from 'react';
import ModalAddProduct from '../components/ModalAddProduct';
import { Col, Button, Table } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { KEYS } from '~/constants/keys';
import { createProduct, getAllProducts, updateProduct } from '~/services'; // Import thêm hàm updateProduct
import UpdateProductModal from '~/components/UpdateProductModal';
import ProductDetailModal from '~/components/ProductDetailModal ';
import AddProductDetailModal from '~/components/AddProductDetailModal';
import RemoveProductDetailModal from '~/components/RemoveProductDetailModal';
import { toast } from 'react-toastify';
import {
    addBaobi,
    addDinhMucLyThuyet,
    addMau,
} from '~/services/productDetail.service';

function AdminProduct() {
    const [isShowModalAddProduct, setIsShowModalAddProduct] = useState(false);
    const [isShowModalUpdateProduct, setIsShowModalUpdateProduct] =
        useState(false);
    const [isShowProductDetailModal, setIsShowProductDetailModal] =
        useState(false);
    const [isShowAddProductDetailModal, setIsShowAddProductDetailModal] =
        useState(false);
    const [isShowRemovePRoductDetailModal, setIsShowRemovePRoductDetailModal] =
        useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: [KEYS.GET_ALL_PRODUCTS],
        queryFn: () => getAllProducts(),
        staleTime: 1000 * 60 * 5,
    });

    const createMutation = useMutation({
        mutationKey: [KEYS.GET_ALL_PRODUCTS],
        mutationFn: (data) => createProduct(data),
        onSuccess: () => {
            toast.success('Thêm sản phẩm thành công', {
                position: 'top-right',
                autoClose: 3000,
            });
            queryClient.invalidateQueries([KEYS.GET_ALL_PRODUCTS]); // Tự động làm mới dữ liệu sau khi thêm sản phẩm mới
            setIsShowModalAddProduct(false);
        },
        onError: (error) => {
            console.error(error);
            toast.error('Thêm sản phẩm thất bại', {
                position: 'top-right',
                autoClose: 3000,
            });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ maSanPham, ttSanPhamMoi, ttChiTietSanPhamMoi }) =>
            updateProduct(maSanPham, ttSanPhamMoi, ttChiTietSanPhamMoi),
        onSuccess: () => {
            toast.success('Cập nhập sản phẩm thành công', {
                position: 'top-right',
                autoClose: 3000,
            });
            queryClient.invalidateQueries([KEYS.GET_ALL_PRODUCTS]);
            setIsShowModalUpdateProduct(false);
        },
        onError: (error) => {
            console.error(error);
            toast.error('Cập nhật sản phẩm thất bại', {
                position: 'top-right',
                autoClose: 3000,
            });
        },
    });

    const createBaobiMutation = useMutation({
        mutationFn: (data) => addBaobi(data),
        onSuccess: () => {
            toast.success('Thêm bao bì thành công', {
                position: 'top-right',
                autoClose: 3000,
            });
            queryClient.invalidateQueries([KEYS.GET_ALL_PRODUCTS]);
            setIsShowModalUpdateProduct(false);
        },
        onError: (error) => {
            console.error(error);
            toast.error('Thêm bao bì thất bại', {
                position: 'top-right',
                autoClose: 3000,
            });
        },
    });

    const createMauMutation = useMutation({
        mutationFn: (data) => addMau(data),
        onSuccess: () => {
            toast.success('Thêm màu thành công', {
                position: 'top-right',
                autoClose: 3000,
            });
            queryClient.invalidateQueries([KEYS.GET_ALL_PRODUCTS]);
            setIsShowModalUpdateProduct(false);
        },
        onError: (error) => {
            console.error(error);
            toast.error('Thêm màu thất bại', {
                position: 'top-right',
                autoClose: 3000,
            });
        },
    });

    const createDinhMucLyThuyetMutation = useMutation({
        mutationFn: (data) => addDinhMucLyThuyet(data),
        onSuccess: () => {
            toast.success('Thêm định mức lý thuyết thành công', {
                position: 'top-right',
                autoClose: 3000,
            });
            queryClient.invalidateQueries([KEYS.GET_ALL_PRODUCTS]);
            setIsShowModalUpdateProduct(false);
        },
        onError: (error) => {
            console.error(error);
            toast.error('Thêm định mức lý thuyết thất bại', {
                position: 'top-right',
                autoClose: 3000,
            });
        },
    });

    const handleAddProduct = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            Object.assign(data, { [key]: value });
        });
        createMutation.mutate(data);
    };

    const handleUpdateProductClick = (prod) => {
        setSelectedProduct(prod);
        setIsShowModalUpdateProduct(true);
    };
    const handleProductDetailModal = (prod) => {
        setSelectedProduct(prod);
        setIsShowProductDetailModal(true);
    };


    const handleAddProductDetailModal = (productDetail) => {
        let data = {}; // Khởi tạo data trước khối if

        if (productDetail.loaiChiTiet === 'Bao bì') {
            data = {
                loaiBaoBi: productDetail.moTa,
            };
            createBaobiMutation.mutate(data);
        } else if (productDetail.loaiChiTiet === 'Màu') {
            data = {
                mau: productDetail.moTa,
            };
            createMauMutation.mutate(data);
        } else {
            data = {
                dinhMuc: productDetail.moTa,
            };
        }

        console.log(data);
        console.log(productDetail);
    };

    const handleSaveUpdatedProduct = (updatedProduct) => {
        const ttSanPhamMoi = {
            loai: updatedProduct.loai,
            ten: updatedProduct.ten,
            tinhNang: updatedProduct.tinhNang,
            moTa: updatedProduct.moTa,
            hinhAnh: updatedProduct.hinhAnh,
            nhaSanXuatId: updatedProduct.tenNhaSanXuat,
        };

        const maBaoBi = updatedProduct.maBaoBi;
        const maDinhMucLyThuyet = updatedProduct.maDinhMucLyThuyet;
        const maSanPham = updatedProduct.maSanPham;
        const maMau = updatedProduct.maMau;
        const soLuong = updatedProduct.soLuong;
        const ttChiTietSanPhamMoi = {
            [`${maBaoBi}-${maDinhMucLyThuyet}-${maSanPham}-${maMau}`]: soLuong,
        };

        console.log(ttSanPhamMoi);
        console.log(ttChiTietSanPhamMoi);

        // Đóng gói tất cả dữ liệu vào một đối tượng duy nhất
        updateMutation.mutate({
            maSanPham: updatedProduct.maSanPham,
            ttSanPhamMoi,
            ttChiTietSanPhamMoi,
        });
    };

    return (
        <Col sm={12} md={12} lg={10} xl={10}>
            <h1 className="text-center mb-5">Quản Lý Sản Phẩm</h1>
            <div>
                <Button
                    className="mt-4 rounded mb-2"

                    onClick={() => setIsShowModalAddProduct(true)}
                >
                    Thêm sản phẩm
                </Button>
                <Button
                    className="mt-4 rounded mb-2 ms-3"

                    onClick={() => setIsShowAddProductDetailModal(true)}
                >
                    Thêm chi tiết sản phẩm
                </Button>
                <Button
                    className="mt-4 mb-1 mx-1 rounded"
                    onClick={() => setIsShowRemovePRoductDetailModal(true)}
                >
                    Xoá chi tiết sản phẩm
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
                                >
                                    STT
                                </th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                    }}
                                >
                                    Tên sản phẩm
                                </th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                    }}
                                >
                                    Loại
                                </th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                    }}
                                >
                                    Tên nhà sản xuất
                                </th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                    }}
                                ></th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                    }}
                                ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading &&
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
                                                onClick={() =>
                                                    handleProductDetailModal(
                                                        prod
                                                    )
                                                }
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
                                ))}
                        </tbody>
                    </Table>
                </div>
                <AddProductDetailModal
                    show={isShowAddProductDetailModal}
                    onHide={() => setIsShowAddProductDetailModal(false)}
                    onSave={handleAddProductDetailModal}
                />
                <ProductDetailModal
                    show={isShowProductDetailModal}
                    onHide={() => setIsShowProductDetailModal(false)}
                    product={selectedProduct}
                />

                <UpdateProductModal
                    show={isShowModalUpdateProduct}
                    onHide={() => setIsShowModalUpdateProduct(false)}
                    productData={selectedProduct}
                    onSave={handleSaveUpdatedProduct} // Truyền hàm cập nhật sản phẩm vào modal
                />
                <ModalAddProduct
                    show={isShowModalAddProduct}
                    onHide={() => setIsShowModalAddProduct(false)}
                    onSubmit={handleAddProduct}
                />
                <RemoveProductDetailModal
                    show={isShowRemovePRoductDetailModal}
                    onHide={() => setIsShowRemovePRoductDetailModal(false)}
                    // onSubmit={handleRemoveProductDetail}
                />
            </div>
        </Col>
    );
}

export default AdminProduct;
