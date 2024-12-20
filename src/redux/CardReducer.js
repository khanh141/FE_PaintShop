import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    checkedItems: {},
    selectAll: false,
};

export const fetchProducts = createAsyncThunk(
    'cart/fetchProducts',
    async (tenDangNhap, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(
                `http://localhost:8080/gioHang/xemChiTiet/${tenDangNhap}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const cardSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCheckbox: (state, action) => {
            const { maSanPham, mau, loaiBaoBi } = action.payload;
            state.products = state.products.map((product) => {
                if (
                    product.maSanPham === maSanPham &&
                    product.chiTietSanPham.mau === mau &&
                    product.chiTietSanPham.loaiBaoBi === loaiBaoBi
                ) {
                    product.isChecked = !product.isChecked;
                }
                return product;
            });

            // Cập nhật `selectAll` nếu tất cả sản phẩm đã được chọn
            state.selectAll = state.products.every(
                (product) => product.isChecked
            );
        },
        toggleSelectAll: (state) => {
            const newSelectAll = !state.selectAll;
            state.selectAll = newSelectAll;

            // Cập nhật `isChecked` cho từng sản phẩm theo `selectAll`
            state.products = state.products.map((product) => ({
                ...product,
                isChecked: newSelectAll,
            }));
        },
        // Thêm sản phẩm vào Redux
        addProduct: (state, action) => {
            const newProduct = action.payload; // sản phẩm mới từ action

            const existingProduct = state.products.find(
                (product) =>
                    product.maSanPham === newProduct.maSanPham &&
                    product.chiTietSanPham.mau ===
                        newProduct.chiTietSanPham.mau &&
                    product.chiTietSanPham.loaiBaoBi ===
                        newProduct.chiTietSanPham.loaiBaoBi
            );

            if (existingProduct) {
                existingProduct.soLuong += 1;
            } else {
                state.products.push({
                    ...newProduct,
                    isChecked: true,
                });
            }
        },

        increaseQuantity: (state, action) => {
            const product = state.products.find(
                (p) =>
                    p.maSanPham === action.payload.maSanPham &&
                    p.chiTietSanPham.loaiDinhMucLyThuyet ===
                        action.payload.chiTietSanPham.loaiDinhMucLyThuyet &&
                    p.chiTietSanPham.loaiBaoBi ===
                        action.payload.chiTietSanPham.loaiBaoBi &&
                    p.chiTietSanPham.mau === action.payload.chiTietSanPham.mau
            );
            if (product) product.soLuong += 1;
        },
        decreaseQuantity: (state, action) => {
            const product = state.products.find(
                (p) =>
                    p.maSanPham === action.payload.maSanPham &&
                    p.chiTietSanPham.loaiDinhMucLyThuyet ===
                        action.payload.chiTietSanPham.loaiDinhMucLyThuyet &&
                    p.chiTietSanPham.loaiBaoBi ===
                        action.payload.chiTietSanPham.loaiBaoBi &&
                    p.chiTietSanPham.mau === action.payload.chiTietSanPham.mau
            );
            if (product && product.soLuong > 1) {
                product.soLuong -= 1;
            }
        },
        removeProduct: (state, action) => {
            console.log('Removing product with details:', action.payload);
            console.log('Current cart state before removal:', state.products);
            state.products = state.products.filter(
                (p) =>
                    !(
                        p.maSanPham === action.payload.maSanPham &&
                        p.chiTietSanPham.loaiDinhMucLyThuyet ===
                            action.payload.chiTietSanPham.loaiDinhMucLyThuyet &&
                        p.chiTietSanPham.loaiBaoBi ===
                            action.payload.chiTietSanPham.loaiBaoBi &&
                        p.chiTietSanPham.mau ===
                            action.payload.chiTietSanPham.mau
                    )
            );
        },
        setProductQuantity: (state, action) => {
            const cartProduct = state.products.find(
                (p) =>
                    p.maSanPham === action.payload.maSanPham &&
                    p.chiTietSanPham.loaiDinhMucLyThuyet ===
                        action.payload.chiTietSanPham.loaiDinhMucLyThuyet &&
                    p.chiTietSanPham.loaiBaoBi ===
                        action.payload.chiTietSanPham.loaiBaoBi &&
                    p.chiTietSanPham.mau === action.payload.chiTietSanPham.mau
            );
            if (cartProduct) {
                cartProduct.soLuong = action.payload.soLuong;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.checkedItems = action.payload.reduce((acc, product) => {
                acc[product.id] = product.isChecked || false;
                return acc;
            }, {});
            state.selectAll = action.payload.every(
                (product) => product.isChecked
            ); // Cập nhật `selectAll`
        });
    },
});

// Action để tăng số lượng sản phẩm
export const increaseProductQuantity =
    (product, tenDangNhap) => async (dispatch) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'http://localhost:8080/gioHang/themSanPham',
                {
                    ...product.chiTietSanPham,
                    maSanPham: product.maSanPham,
                    tenDangNhap,
                    soLuong: 1,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data === 'Thanh cong') {
                dispatch(increaseQuantity(product));
            }
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

// Action để giảm số lượng sản phẩm hoặc xoá khi số lượng = 1
export const decreaseProductQuantity =
    (product, tenDangNhap) => async (dispatch) => {
        const token = localStorage.getItem('token');
        if (product.soLuong === 1) {
            try {
                const response = await axios.post(
                    'http://localhost:8080/gioHang/xoaSanPham',
                    {
                        ...product.chiTietSanPham,
                        maSanPham: product.maSanPham,
                        tenDangNhap,
                        soLuong: 1,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.data === 'Xoa thanh cong ma san pham') {
                    dispatch(removeProduct(product));
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        } else {
            try {
                const response = await axios.put(
                    'http://localhost:8080/gioHang/giamSanPham',
                    {
                        ...product.chiTietSanPham,
                        maSanPham: product.maSanPham,
                        tenDangNhap,
                        soLuong: 1,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.data === 'Thanh cong') {
                    dispatch(decreaseQuantity(product)); // Cập nhật số lượng ở frontend
                }
            } catch (error) {
                console.error('Error decreasing quantity:', error);
            }
        }
    };

export const removeProductFromCart =
    (product, tenDangNhap) => async (dispatch) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'http://localhost:8080/gioHang/xoaSanPham',
                {
                    ...product.chiTietSanPham,
                    maSanPham: product.maSanPham,
                    tenDangNhap,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data === 'Xoa thanh cong ma san pham') {
                console.log('Removing product from cart in Redux:', product);
                dispatch(removeProduct(product)); // Ensure full product object is passed here
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

export const {
    toggleCheckbox,
    toggleSelectAll,
    increaseQuantity,
    decreaseQuantity,
    removeProduct,
    addProduct,
    setProductQuantity,
} = cardSlice.actions;

export default cardSlice.reducer;
