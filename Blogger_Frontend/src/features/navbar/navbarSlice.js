import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  home: false,
  isHomeClick: false,
  isMedia: false,
  isNewBlog: false,
  isMyBlog: false,
  isContact: false,
  isClickMyBlog: false,
  isClickMedia: false,
};
export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setHomeClick: (state) => {
      state.isHomeClick = !state.isHomeClick;
    },
    setOption: (state, { payload }) => {
      state.isMedia = false;
      state.isNewBlog = false;
      state.isMyBlog = false;
      state.isContact = false;
      if (payload === "MEDIA") {
        state.isMedia = true;
        state.isClickMedia = !state.isClickMedia;
      } else if (payload === "MYBLOG") {
        state.isMyBlog = true;
        state.isClickMyBlog = !state.isClickMyBlog;
      } else if (payload === "NEWBLOG") state.isNewBlog = true;
      else if (payload === "CONTACT") state.isContact = true;
    },
  },
});

export const { setHomeClick, setOption } = navbarSlice.actions;
export default navbarSlice.reducer;
