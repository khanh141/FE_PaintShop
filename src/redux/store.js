import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import productReducer from "./ProductReducer";
import cartReducer from "./CardReducer";
import appSlice from "./AppSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userSlice,
    app: appSlice,
  },
});

export default store;
