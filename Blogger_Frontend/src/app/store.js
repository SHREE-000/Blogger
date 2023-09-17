import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import navbarSlice from "../features/navbar/navbarSlice";
import blogSlice from "../features/blog/blogSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    navbar: navbarSlice,
    blog: blogSlice,
  },
});
