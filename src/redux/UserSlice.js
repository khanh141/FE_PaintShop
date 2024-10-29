import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  tenDangNhap: "",
  quyen: [],
  hoTen: "",
  soDienThoai: "",
  email: "",
  diaChi: "",
  maNhanVien: "",
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
      prepare(hoTen, soDienThoai, email, diaChi, maNhanVien) {
        return {
          payload: {
            hoTen,
            soDienThoai,
            email,
            diaChi: diaChi || "",
            maNhanVien: maNhanVien || "",
            isLoggedIn: true,
          },
        };
      },
      reducer(state, action) {
        const { hoTen, soDienThoai, email, diaChi, maNhanVien } =
          action.payload;

        state.hoTen = hoTen;
        state.soDienThoai = soDienThoai;
        state.email = email;
        if (diaChi) state.diaChi = diaChi;
        if (maNhanVien) state.maNhanVien = maNhanVien;
        state.isLoggedIn = true;
      },
    },
    clearUser(state) {
      Object.assign(state, userInitialState);
    },
  },
});

export default userSlice.reducer;
export const { setUser, setProfile, clearUser } = userSlice.actions;
