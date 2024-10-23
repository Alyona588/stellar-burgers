import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TConstructorState
} from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export const initialState: TConstructorState = {
  ingredients: [],
  bun: null
};

const slice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TIngredient | null>) {
      state.bun = action.payload;
    },
    addIngredient: {
      prepare: (payload: TIngredient) => ({
        payload: { ...payload, id: uuidv4() }
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      }
    },
    deleteIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredient(
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) {
      const { index, direction } = action.payload;
      const ingredients = [...state.ingredients];
      const newIndex = direction === 'up' ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= ingredients.length) {
        return;
      }

      [ingredients[index], ingredients[newIndex]] = [
        ingredients[newIndex],
        ingredients[index]
      ];
      state.ingredients = ingredients;
    }
  }
});

export const {
  addIngredient,
  moveIngredient,
  resetConstructor,
  deleteIngredient,
  addBun
} = slice.actions;

export default slice.reducer;
