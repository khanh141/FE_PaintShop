// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     searchTerm: '',
//     minPrice: 0,
//     maxPrice: 1000000000,
//     minRating: 0,
//     filteredProducts: [],
// };

// const filterSlice = createSlice({
//     name: 'filters',
//     initialState,
//     reducers: {
//         setSearchTerm: (state, action) => {
//             state.searchTerm = action.payload;
//         },
//         setPriceRange: (state, action) => {
//             state.minPrice = action.payload.min;
//             state.maxPrice = action.payload.max;
//         },
//         setRating: (state, action) => {
//             state.minRating = action.payload;
//         },
//         setFilteredProducts: (state, action) => {
//             state.filteredProducts = action.payload;
//         },
//         clearFilters: (state) => {
//             state.searchTerm = '';
//             state.minPrice = 0;
//             state.maxPrice = 1000000000;
//             state.minRating = 0;
//         },
//     },
// });

// export const { setSearchTerm, setPriceRange, setRating, setFilteredProducts, clearFilters } = filterSlice.actions;
// export default filterSlice.reducer;