import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import productReducer from "./ProductReducer";
import cartReducer from "./CardReducer";
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userSlice,
  },
});

export default store;
