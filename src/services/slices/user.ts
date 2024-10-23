import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';

import { TUser, TUserState } from '@utils-types';
import { clearTokens, takeTokensToStore } from '../../utils/cookie';

export const initialState: TUserState = {
  data: {
    name: '',
    email: ''
  },
  isAuthChecked: false,
  isAuthenticated: false,
  isLoading: false
};

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'registerUser',
  async (data) => {
    const response = await registerUserApi(data);
    const { user, accessToken, refreshToken } = response;
    takeTokensToStore(refreshToken, accessToken);
    return user;
  }
);

export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'loginUser',
  async (data) => {
    const response = await loginUserApi(data);
    const { user, accessToken, refreshToken } = response;
    takeTokensToStore(refreshToken, accessToken);
    return user;
  }
);

export const logoutUser = createAsyncThunk('logoutUser', async () => {
  await logoutApi();
  clearTokens();
});

export const getUser = createAsyncThunk('getUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'updateUser',
  async (data) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.registerError = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.data = {
          email: '',
          name: ''
        };
      });
  }
});

export default slice.reducer;
