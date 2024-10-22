import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductReducer';
import cartReducer from './CardReducer';

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
    },
});

export default store;