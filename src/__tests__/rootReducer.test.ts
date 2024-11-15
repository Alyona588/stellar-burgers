import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../../src/services/slices/ingredients';
import feedsReducer from '../../src/services/slices/ingredients';
import userReducer from '../../src/services/slices/ingredients';
import constructorReducer from '../../src/services/slices/ingredients';
import ordersReducer from '../../src/services/slices/ingredients';

it('тестирование корневого редюсера', () => {
  const rootReducer = combineReducers({
    user: userReducer,
    builder: constructorReducer,
    ingredients: ingredientsReducer,
    feeds: feedsReducer,
    orders: ordersReducer
  });

  const store = configureStore({ reducer: rootReducer });
  expect(store.getState()).toEqual(
    rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
  );
});
