import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  tenDangNhap: "",
  quyen: [],
  soDienThoai: "",
  email: "",
  diaChi: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: {
      prepare(tenDangNhap, quyen) {
        return {
          payload: {
            tenDangNhap,
            quyen: quyen || [],
            isLoggedIn: true,
          },
        };
      },
      reducer(state, action) {
        state.tenDangNhap = action.payload.tenDangNhap;
        state.quyen = action.payload.quyen;
        state.isLoggedIn = true;
      },
    },
    setProfile: {
      prepare(soDienThoai, email, diaChi) {
        return {
          payload: {
            soDienThoai,
            email,
            diaChi,
          },
        };
      },
      reducer(state, action) {
        (state.soDienThoai = action.payload.soDienThoai),
          (state.email = action.payload.email),
          (state.diaChi = action.payload.diaChi);
      },
    },
    clearUser(state) {
      Object.assign(state, userInitialState);
    },
  },
});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
