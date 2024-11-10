import { useEffect, useState } from 'react';
import ModalAddProduct from '../components/ModalAddProduct';
import { Col, Button, Table } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { KEYS } from '~/constants/keys';
import { createProduct, getAllProducts, updateProduct } from '~/services'; // Import thêm hàm updateProduct
import UpdateProductModal from '~/components/UpdateProductModal';
import ProductDetailModal from '~/components/ProductDetailModal ';
import AddProductDetailModal from '~/components/AddProductDetailModal';
//import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import {
    addBaobi,
    addDinhMucLyThuyet,
    addMau,
} from '~/services/productDetail.service';
import RemoveProductDetailModal from '~/components/RemoveProductDetailModal';
import axios from 'axios';

function AdminProduct() {
    const [isShowModalAddProduct, setIsShowModalAddProduct] = useState(false);
    const [isShowModalUpdateProduct, setIsShowModalUpdateProduct] =
        useState(false);
    const [isShowProductDetailModal, setIsShowProductDetailModal] =
        useState(false);
    const [isShowAddProductDetailModal, setIsShowAddProductDetailModal] =
        useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isShowRemovePRoductDetailModal, setIsShowRemovePRoductDetailModal] =
        useState(false);

    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: [KEYS.GET_ALL_PRODUCTS],
        queryFn: () => getAllProducts(),
        staleTime: 1000 * 60 * 5,
    });
    const createMutation = useMutation({
        mutationFn: (formData) => {
            return createProduct(formData);
        },
        onSuccess: () => {
            toast.success('Thêm sản phẩm thành công', {
                position: 'top-right',
                autoClose: 3000,
            });
            queryClient.invalidateQueries([KEYS.GET_ALL_PRODUCTS]);
            setIsShowModalAddProduct(false);
        },
        onError: (error) => {
            console.error(error.response?.data);
            // Kiểm tra và lấy thông báo lỗi từ phản hồi của backend
            const errorMessage =
                error.response?.data || 'Thêm sản phẩm thất bại';
            toast.error(errorMessage, {
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
        onSettled: () => {
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

        const formData = new FormData(e.target); // Tự động lấy tất cả các field trong form

        const req = {};
        formData.forEach((value, key) => {
            if (key !== 'imageFile') {
                req[key] = value;
            }
        });

        console.log(req);

        // Tạo mới FormData để thêm file và đối tượng req đã được stringify
        const tmp = new FormData();
        tmp.append('imageFile', formData.get('imageFile'));
        tmp.append(
            'req',
            new Blob([JSON.stringify(req)], { type: 'application/json' })
        );

        console.log(tmp);

        // Gửi formData qua mutation
        createMutation.mutate(tmp);
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
            createDinhMucLyThuyetMutation.mutate(data);
        }

        // console.log(data);
        // console.log(productDetail);
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

        // console.log(ttSanPhamMoi);
        // console.log(ttChiTietSanPhamMoi);

        // Đóng gói tất cả dữ liệu vào một đối tượng duy nhất
        updateMutation.mutate({
            maSanPham: updatedProduct.maSanPham,
            ttSanPhamMoi,
            ttChiTietSanPhamMoi,
        });
    };

    const [baoBiOptions, setBaoBiOptions] = useState([]);
    const [mauOptions, setMauOptions] = useState([]);
    const [dinhMucOptions, setDinhMucOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };

                const [baoBiRes, mauRes, dinhMucRes] = await Promise.all([
                    axios.get('http://localhost:8080/baoBi/layTatCa', {
                        headers,
                    }),
                    axios.get('http://localhost:8080/mau/layTatCa', {
                        headers,
                    }),
                    axios.get(
                        'http://localhost:8080/dinhMucLyThuyet/layTatCa',
                        { headers }
                    ),
                ]);

                setBaoBiOptions(baoBiRes.data);
                setMauOptions(mauRes.data);
                setDinhMucOptions(dinhMucRes.data);
                console.log(mauOptions);
            } catch (error) {
                console.error('API fetch error:', error);
            }
        };

        fetchOptions();
    }, [
        createBaobiMutation.isSuccess,
        createMauMutation.isSuccess,
        createDinhMucLyThuyetMutation.isSuccess,
    ]);

    return (
        <Col sm={12} md={12} lg={10} xl={10}>
            <h1
                style={{
                    fontSize: '2.5rem',
                    color: '#4a90e2', // Màu xanh dương
                    marginBottom: '2rem',
                    marginTop: '2rem',
                    textAlign: 'center',
                    paddingBottom: '0.5rem',
                    letterSpacing: '1px',
                    borderBottom: '2px solid #ccc',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    background: 'linear-gradient(to right, #4a90e2, #50e3c2)',
                    WebkitBackgroundClip: 'text',
                }}
            >
                Quản Lý Sản Phẩm
            </h1>
            <div>
                <Button
                    className="priColor mb-2"
                    onClick={() => setIsShowModalAddProduct(true)}
                >
                    Thêm sản phẩm
                </Button>
                <Button
                    className="priColor mb-2 ms-3"
                    onClick={() => setIsShowAddProductDetailModal(true)}
                >
                    Thêm chi tiết sản phẩm
                </Button>
                <Button
                    className="priColor mb-2 ms-3"
                    onClick={() => setIsShowRemovePRoductDetailModal(true)}
                >
                    Xoá chi tiết sản phẩm
                </Button>
                <div
                    className="mt-4 "
                    style={{
                        maxHeight: '73vh',
                        overflowY: 'auto',
                        width: '100%',
                    }}
                >
                    <Table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse', // Xóa khoảng cách giữa các ô
                            border: '1px solid #ddd', // Thêm đường viền xung quanh toàn bộ bảng
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
                                        padding: '8px',
                                        textAlign: 'left',
                                        borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                        borderBottom: '2px solid #ddd', // Đường kẻ dưới các tiêu đề
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
                                        padding: '8px',
                                        textAlign: 'left',
                                        borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                        borderBottom: '2px solid #ddd', // Đường kẻ dưới các tiêu đề
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
                                        padding: '8px',
                                        textAlign: 'left',
                                        borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                        borderBottom: '2px solid #ddd', // Đường kẻ dưới các tiêu đề
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
                                        padding: '8px',
                                        textAlign: 'left',
                                        borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                        borderBottom: '2px solid #ddd', // Đường kẻ dưới các tiêu đề
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
                                        padding: '8px',
                                        textAlign: 'center',
                                        borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                        borderBottom: '2px solid #ddd', // Đường kẻ dưới các tiêu đề
                                    }}
                                ></th>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor: '#f0f0f0',
                                        zIndex: 1,
                                        padding: '8px',
                                        textAlign: 'center',
                                        borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                        borderBottom: '2px solid #ddd', // Đường kẻ dưới các tiêu đề
                                    }}
                                ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading &&
                                data?.data?.map((prod, index) => (
                                    <tr key={index}>
                                        <td
                                            style={{
                                                padding: '8px',
                                                textAlign: 'left',
                                                borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                                borderBottom: '1px solid #ddd', // Đường kẻ dưới mỗi dòng
                                            }}
                                        >
                                            {index + 1}
                                        </td>
                                        <td
                                            style={{
                                                padding: '8px',
                                                textAlign: 'left',
                                                borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                                borderBottom: '1px solid #ddd', // Đường kẻ dưới mỗi dòng
                                            }}
                                        >
                                            {prod.ten}
                                        </td>
                                        <td
                                            style={{
                                                padding: '8px',
                                                textAlign: 'left',
                                                borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                                borderBottom: '1px solid #ddd', // Đường kẻ dưới mỗi dòng
                                            }}
                                        >
                                            {prod.loai}
                                        </td>
                                        <td
                                            style={{
                                                padding: '8px',
                                                textAlign: 'left',
                                                borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                                borderBottom: '1px solid #ddd', // Đường kẻ dưới mỗi dòng
                                            }}
                                        >
                                            {prod.tenNhaSanXuat}
                                        </td>
                                        <td
                                            style={{
                                                padding: '8px',
                                                textAlign: 'center',
                                                borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                                borderBottom: '1px solid #ddd', // Đường kẻ dưới mỗi dòng
                                            }}
                                        >
                                            <Button
                                                style={{
                                                    background:
                                                        'rgb(145 254 159 / 47%)',
                                                    color: 'black',
                                                }}
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
                                        <td
                                            style={{
                                                padding: '8px',
                                                textAlign: 'center',
                                                borderRight: '1px solid #ddd', // Đường kẻ giữa các cột
                                                borderBottom: '1px solid #ddd', // Đường kẻ dưới mỗi dòng
                                            }}
                                        >
                                            <Button
                                                style={{
                                                    background:
                                                        'rgb(145 254 159 / 47%)',
                                                    color: 'black',
                                                }}
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
                    mauOptions={mauOptions}
                    dinhMucOptions={dinhMucOptions}
                    baoBiOptions={baoBiOptions}
                />
                <RemoveProductDetailModal
                    show={isShowRemovePRoductDetailModal}
                    onHide={() => setIsShowRemovePRoductDetailModal(false)}
                    mauOptions={mauOptions}
                    dinhMucOptions={dinhMucOptions}
                    baoBiOptions={baoBiOptions}
                    // onSubmit={handleRemoveProductDetail}
                />
            </div>{' '}
            {/* <ToastContainer /> */}
        </Col>
    );
}

export default AdminProduct;
