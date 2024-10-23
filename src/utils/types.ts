import { SerializedError } from '@reduxjs/toolkit';

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TIngredientsState = {
  data: TIngredient[];
  isLoading: boolean;
  error: null | string;
};

export type TConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TIngredient | null;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number | undefined;
  totalToday: number | undefined;
};

export type TOrdersState = {
  data: TOrder[];
  orderModalData: TOrder | null;
  error: null | string;
  isOrderLoading: boolean;
  isOrdersLoading: boolean;
  orderRequest: boolean;
};

export type TFeedsState = {
  data: TOrdersData;
  isLoading: boolean;
  error: null | string;
};

export type TUser = {
  email: string;
  name: string;
};

export type TUserState = {
  data: TUser;
  loginError?: SerializedError;
  registerError?: SerializedError;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type TTabMode = 'bun' | 'sauce' | 'main';
