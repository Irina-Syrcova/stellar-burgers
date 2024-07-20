import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('feeds/getAll', async () =>
  getFeedsApi()
);

interface TFeedsState {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  error: string | undefined;
  loading: boolean;
}

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: '',
  loading: true
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getAllFeeds: (state) => state.orders,
    getFeedsTotal: (state) => state.total,
    getFeedsTotalToday: (state) => state.totalToday,
    getFeedsLoading: (state) => state.loading,
    getFeedsError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const {
  getAllFeeds,
  getFeedsLoading,
  getFeedsError,
  getFeedsTotal,
  getFeedsTotalToday
} = feedsSlice.selectors;

export default feedsSlice.reducer;
