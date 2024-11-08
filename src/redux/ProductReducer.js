import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    filteredProducts: [],
    displayedCards: 8,
    showAll: false,
    isButtonDisabled: false,
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
        setButtonDisabled: (state, action) => {
            state.isButtonDisabled = action.payload;
        },
    },
});

export const { setFilter, setShowAll, setSearchTerm, setButtonDisabled } =
    productsSlice.actions;
export default productsSlice.reducer;
