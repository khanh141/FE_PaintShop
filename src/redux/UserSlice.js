import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  tenDangNhap: "",
  quyen: [],
  soDienThoai: "",
  email: "",
  diaChi: "",
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
          },
        };
      },
      reducer(state, action) {
        state.tenDangNhap = action.payload.tenDangNhap;
        state.quyen = action.payload.quyen;
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
      Object.assign(state, initialStateUser);
    },
  },
});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
