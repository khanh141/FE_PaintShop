// features/loadingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isLoading: false,
    isSuccess: false,
    profileActiveTab: "1",
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSuccess(state, action) {
      state.isLoading = !action.payload;
      state.isSuccess = action.payload;
    },
    resetStatus(state) {
      state.isLoading = false;
      state.isSuccess = false;
    },
    setProfileActiveTab: {
      prepare(profileActiveTab) {
        return {
          payload: {
            profileActiveTab,
          },
        };
      },
      reducer(state, action) {
        state.profileActiveTab = action.payload.profileActiveTab;
      },
    },
  },
});

export const { setLoading, setSuccess, resetStatus, setProfileActiveTab } =
  appSlice.actions;
export default appSlice.reducer;
