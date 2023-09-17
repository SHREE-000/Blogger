import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register, login, logout } from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  token: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const signup = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const signin = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const signout = createAsyncThunk("auth/logout", async () => {
  await logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.token = "";
    },
    setUser: (state, { payload }) => {
      state.uesr = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.token = user;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(signout.fulfilled, (state) => {
        state.user = null;
        state.token = "";
      });
  },
});

export const { reset, setUser } = authSlice.actions;
export default authSlice.reducer;
