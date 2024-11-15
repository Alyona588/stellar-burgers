import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredientsState } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'getIngredients',
  async () => await getIngredientsApi()
);

export const initialState: TIngredientsState = {
  data: [],
  isLoading: true,
  error: null
};

const slice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export default slice.reducer;
