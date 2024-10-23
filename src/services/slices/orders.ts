import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder, TOrdersState } from '@utils-types';

export const initialState: TOrdersState = {
  data: [],
  orderModalData: null,
  error: null,
  isOrderLoading: true,
  isOrdersLoading: true,
  orderRequest: false
};

export const getOrder = createAsyncThunk<TOrder, number>(
  'getOrder',
  async (data) => {
    const response = await getOrderByNumberApi(data);
    return response.orders[0];
  }
);

export const getOrders = createAsyncThunk(
  'getOrders',
  async () => await getOrdersApi()
);

export const createOrder = createAsyncThunk<
  {
    order: TOrder;
    name: string;
  },
  string[]
>('createOrder', async (data) => {
  const response = await orderBurgerApi(data);
  return { order: response.order, name: response.name };
});

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderModalData = action.payload;
      })
      .addCase(getOrder.rejected, (state) => {
        state.isOrderLoading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { resetOrderModalData } = slice.actions;

export default slice.reducer;
