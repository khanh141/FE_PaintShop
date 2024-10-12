import { createSlice } from '@reduxjs/toolkit';
import testDataInFile from '../testData.json';

const initialState = {
    // products: testDataInFile,
    // filteredProducts: testDataInFile,
    // displayedCards: 8,
    // showAll: false,
    products: [],
    filteredProducts: [],
    displayedCards: 8,
    showAll: false
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            // state.filteredProducts = action.payload.filteredData;
            state.filteredProducts = action.payload;
        },
        setShowAll: (state) => {
            state.showAll = !state.showAll;
            state.displayedCards = state.showAll ? state.products.length : 8;
        },
    },
});

export const { setFilter, setShowAll } = productsSlice.actions;
export default productsSlice.reducer;