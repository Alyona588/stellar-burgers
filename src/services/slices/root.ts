import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients';
import feedsReducer from './feeds';
import userReducer from './user';
import constructorReducer from './builder';
import ordersReducer from './orders';

export const rootReducer = combineReducers({
  user: userReducer,
  builder: constructorReducer,
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  orders: ordersReducer
});
