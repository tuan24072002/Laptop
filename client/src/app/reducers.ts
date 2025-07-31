import appSlice from "@/slice/app/App.slice";
import authSlice from "@/slice/auth/Auth.slice";
import productSlice from "@/slice/product/Product.slice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  product: productSlice,
  app: appSlice,
  auth: authSlice,
});
export default rootReducer;
