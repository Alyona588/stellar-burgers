import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TFeedsState, TOrdersData } from '@utils-types';

export const getFeeds = createAsyncThunk<TOrdersData>(
  'getFeeds',
  async () => await getFeedsApi()
);

export const initialState: TFeedsState = {
  data: {
    orders: [],
    total: undefined,
    totalToday: undefined
  },
  isLoading: true,
  error: null
};

const slice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export default slice.reducer;
