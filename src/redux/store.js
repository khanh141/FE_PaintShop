import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductReducer';
// import filterReducer from './FilterReducer';

const store = configureStore({
    reducer: {
        products: productReducer,
    },
    // reducer: {
    //     filters: filterReducer
    // }
});

export default store;