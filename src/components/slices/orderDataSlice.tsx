import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk('order/get', async (number: number) =>
  getOrderByNumberApi(number)
);

interface TOrderState {
  orders: Array<TOrder>;
  error: string | undefined;
  loading: boolean;
}

const initialState: TOrderState = {
  orders: [],
  error: '',
  loading: true
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrder: (state) => state.orders,
    getOrderLoading: (state) => state.loading,
    getOrderError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      });
  }
});

export const { getOrder, getOrderLoading, getOrderError } =
  orderSlice.selectors;

export default orderSlice.reducer;
