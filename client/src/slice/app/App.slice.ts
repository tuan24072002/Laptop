import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  logined: boolean;
  user: any;
}
const initialState: AppState = {
  logined: false,
  user: null,
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLogined(state, action) {
      state.logined = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
export const { setLogined, setUser } = appSlice.actions;
export default appSlice.reducer;
