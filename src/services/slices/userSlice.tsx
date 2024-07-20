import {
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'register/post',
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'login/post',
  async (data: TLoginData) => loginUserApi(data)
);

export const forgotPassword = createAsyncThunk(
  'forgotPassword/post',
  async (data: { email: string }) => forgotPasswordApi(data)
);

export const resetPasswor = createAsyncThunk(
  'resetPassword/post',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const getUser = createAsyncThunk('user/get', async () => getUserApi());

export const updateUser = createAsyncThunk(
  'user/patch',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logout = createAsyncThunk('logout/post', async () => logoutApi());

export const userOrders = createAsyncThunk('userOrders/get', async () =>
  getOrdersApi()
);

interface TLoginUserState {
  user: TUser | null;
  isAuth: boolean;
  loading: boolean;
  error: string | undefined;
  orders: TOrder[];
}

const initialState: TLoginUserState = {
  user: null,
  isAuth: false,
  loading: false,
  error: undefined,
  orders: []
};

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
  selectors: {
    getUserName: (state) => state.user?.name,
    getUserInfo: (state) => state.user,
    getIsAuth: (state) => state.isAuth,
    getUserOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPasswor.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPasswor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(resetPasswor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(userOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(userOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(userOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  }
});

export const { getUserName, getUserInfo, getIsAuth, getUserOrders } =
  userSlice.selectors;

export default userSlice.reducer;
