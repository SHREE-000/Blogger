import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreateBlog: false,
  isUpdateBlog: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setCreateBlog: (state) => {
      state.isCreateBlog = !state.isCreateBlog;
    },
    setUpdateBlog: (state) => {
      state.isUpdateBlog = !state.isUpdateBlog;
    },
  },
});

export const { setCreateBlog, setUpdateBlog } = blogSlice.actions;
export default blogSlice.reducer;
