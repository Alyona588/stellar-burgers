import reducer, {
  getIngredients,
  initialState
} from '../services/slices/ingredients';
import { mockFirstIngredient } from './mockData';

describe('тестирование ingredientsReducer ', () => {
  describe('проверка асинхронной функции получения ингредиентов', () => {
    test('выполнение запроса', () => {
      const state = reducer(initialState, getIngredients.pending('pending'));
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    test('успешное получение ингредиентов', () => {
      const state = reducer(
        initialState,
        getIngredients.fulfilled([mockFirstIngredient], 'fulfilled')
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.data).toEqual([mockFirstIngredient]);
    });
    test('ошибка при получении ингредиентов', () => {
      const state = reducer(
        initialState,
        getIngredients.rejected(
          new Error('Ошибка получения ингредиентов'),
          'rejected'
        )
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка получения ингредиентов');
      expect(state.data).toEqual([]);
    });
  });
});
