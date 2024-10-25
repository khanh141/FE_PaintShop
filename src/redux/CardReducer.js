import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.items.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find(item => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

// export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;
export const { setCart, addToCartLocal, updateQuantityLocal, removeFromCartLocal } = cartSlice.actions;

// Thunk action để gọi API và sau đó dispatch action local
export const addToCart = (product) => async (dispatch) => {
  try {
    // Gọi API thêm sản phẩm vào giỏ hàng
    // const response = await axios.post('localhost:8080/gioHang/themSanPham' , 
    // {
    //   product.
    // });
    
    // Sau khi API thành công, cập nhật giỏ hàng local
    dispatch(addToCartLocal(response.data));
  } catch (error) {
    console.error('Failed to add product to cart:', error);
  }
};

export const updateQuantity = (productId, quantity) => async (dispatch) => {
  try {
    // Gọi API để cập nhật số lượng sản phẩm
    const response = await axios.put(`/api/cart/${productId}`, { quantity });

    // Sau khi API thành công, cập nhật số lượng local
    dispatch(updateQuantityLocal({ productId, quantity }));
  } catch (error) {
    console.error('Failed to update quantity:', error);
  }
};

export const removeFromCart = (productId) => async (dispatch) => {
  try {
    // Gọi API để xóa sản phẩm khỏi giỏ hàng
    await axios.delete(`/api/cart/${productId}`);

    // Cập nhật giỏ hàng sau khi xóa sản phẩm
    dispatch(removeFromCartLocal({ id: productId }));
  } catch (error) {
    console.error('Failed to remove product from cart:', error);
  }
};

export default cartSlice.reducer;