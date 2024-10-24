import { createSlice } from '@reduxjs/toolkit';
import testDataInFile from '../testData.json';

const initialState = {
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
            state.filteredProducts = action.payload;
        },
        setShowAll: (state) => {
            state.showAll = !state.showAll;
            state.displayedCards = state.showAll ? state.products.length : 8;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload; 
        },
    },
});

export const { setFilter, setShowAll,setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;