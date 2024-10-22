// // import { createSlice } from '@reduxjs/toolkit';

// // const initialState = {
// //   items: [],
// //   totalAmount: 0,
// // };

// // const cartSlice = createSlice({
// //   name: 'cart',
// //   initialState,
// //   reducers: {
// //     addToCart: (state, action) => {
// //       const product = action.payload;
// //       const existingProduct = state.items.find(item => item.id === product.id);
// //       if (existingProduct) {
// //         existingProduct.quantity += 1;
// //       } else {
// //         state.items.push({ ...product, quantity: 1 });
// //       }
// //       state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
// //     },
// //     removeFromCart: (state, action) => {
// //       const productId = action.payload;
// //       const existingProduct = state.items.find(item => item.id === productId);
// //       if (existingProduct && existingProduct.quantity > 1) {
// //         existingProduct.quantity -= 1;
// //       } else {
// //         state.items = state.items.filter(item => item.id !== productId);
// //       }
// //       state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
// //     },
// //     clearCart: (state) => {
// //       state.items = [];
// //       state.totalAmount = 0;
// //     }
// //   }
// // });

// // export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// // export default cartSlice.reducer;


// // CartReducer.js
// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const existingProduct = state.items.find(item => item.id === action.payload.id);
//       if (existingProduct) {
//         // Tăng số lượng sản phẩm nếu đã có trong giỏ hàng
//         existingProduct.quantity += action.payload.quantity;
//       } else {
//         // Thêm sản phẩm mới vào giỏ hàng
//         state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
//       }
//     },
//     updateQuantity: (state, action) => {
//       const { productId, quantity } = action.payload;
//       const product = state.items.find(item => item.id === productId);
//       if (product) {
//         product.quantity = quantity;
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload.id);
//     },
//   },
// });

// export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;


// CartReducer.js
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