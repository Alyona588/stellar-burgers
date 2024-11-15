import reducer, { getFeeds, initialState } from '../services/slices/feeds';
import { feedsMockData } from './mockData';

describe('тестирование feedsReducer ', () => {
  describe('проверка асинхронной функции получения заказов', () => {
    test('выполнение запроса', () => {
      const state = reducer(initialState, getFeeds.pending('pending'));
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('успешное выполнение запроса', () => {
      const state = reducer(
        initialState,
        getFeeds.fulfilled(feedsMockData, 'fulfilled')
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.data).toEqual(feedsMockData);
    });

    test('ошибка выполнения запроса', () => {
      const state = reducer(
        initialState,
        getFeeds.rejected(new Error('error'), 'rejected')
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('error');
    });
  });
});
