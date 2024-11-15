import reducer, {
  addBun,
  addIngredient,
  deleteIngredient,
  initialState,
  moveIngredient,
  resetConstructor
} from '../services/slices/builder';
import {
  mockBun,
  mockFirstIngredient,
  mockSecondIngredient,
  mockThirdIngredient
} from './mockData';

describe('тестирование функций, работающих с ингридиентами', () => {
  test('добавление булки', () => {
    const state = reducer(initialState, addBun(mockBun));
    expect(state.bun).toEqual(mockBun);
    expect(state.ingredients).toHaveLength(0);
  });

  test('добавление ингридиента', () => {
    const state = reducer(initialState, addIngredient(mockFirstIngredient));
    expect(state.ingredients).toHaveLength(1);
  });

  test('удаление ингридиента', () => {
    const state = reducer(
      {
        ingredients: [mockFirstIngredient],
        bun: null
      },
      deleteIngredient(mockFirstIngredient.id)
    );
    expect(state.ingredients).toHaveLength(0);
    expect(state.bun).toBeNull();
  });

  test('сброс конструктора', () => {
    const state = reducer(
      {
        ingredients: [mockFirstIngredient, mockSecondIngredient],
        bun: null
      },
      resetConstructor()
    );
    expect(state.ingredients).toHaveLength(0);
    expect(state.bun).toBeNull();
  });

  test('сдвиг ингридиента вверх', () => {
    const state = reducer(
      {
        ingredients: [
          mockFirstIngredient,
          mockSecondIngredient,
          mockThirdIngredient
        ],
        bun: null
      },
      moveIngredient({ index: 1, direction: 'up' })
    );
    expect(state.bun).toBeNull();
    expect(state.ingredients[0]).toEqual(mockSecondIngredient);
    expect(state.ingredients[1]).toEqual(mockFirstIngredient);
    expect(state.ingredients[2]).toEqual(mockThirdIngredient);
  });

  test('сдвиг ингридиента вниз', () => {
    const state = reducer(
      {
        ingredients: [
          mockFirstIngredient,
          mockSecondIngredient,
          mockThirdIngredient
        ],
        bun: null
      },
      moveIngredient({ index: 1, direction: 'down' })
    );
    expect(state.ingredients[0]).toEqual(mockFirstIngredient);
    expect(state.ingredients[1]).toEqual(mockThirdIngredient);
    expect(state.ingredients[2]).toEqual(mockSecondIngredient);
    expect(state.bun).toBeNull();
  });
});
