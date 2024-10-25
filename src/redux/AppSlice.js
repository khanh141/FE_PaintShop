// features/loadingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isLoading: false,
    isSuccess: false,
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSuccess(state, action) {
      state.isSuccess = action.payload;
    },
    resetStatus(state) {
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
});

export const { setLoading, setSuccess, resetStatus } = appSlice.actions;
export default appSlice.reducer;
