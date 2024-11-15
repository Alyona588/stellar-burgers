import exp from 'constants';
import reducer, {
  getUser,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../services/slices/user';
import { loginMockData, registerMockData, userMockData } from './mockData';

describe('тестирование userReducer ', () => {
  describe('проверка асинхронной функции регистрации пользователя', () => {
    test('запрос выполняется', () => {
      const state = reducer(
        initialState,
        registerUser.pending('pending', registerMockData)
      );
      expect(state.isLoading).toBe(true);
    });
    test('запрос завершился успешно', () => {
      const state = reducer(
        initialState,
        registerUser.fulfilled(userMockData, 'fulfilled', registerMockData)
      );
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.data).toEqual(userMockData);
    });
    test('запрос завершился с ошибкой', () => {
      const state = reducer(
        initialState,
        registerUser.rejected(new Error('error'), 'rejected', registerMockData)
      );
      expect(state.isLoading).toBe(false);
      expect(state.registerError?.message).toEqual('error');
    });
  });

  describe('проверка асинхронной функции получения пользователя', () => {
    test('запрос завершился успешно', () => {
      const state = reducer(
        initialState,
        getUser.fulfilled(userMockData, 'fulfilled')
      );
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.data).toEqual(userMockData);
    });
    test('запрос завершился с ошибкой', () => {
      const state = reducer(
        initialState,
        getUser.rejected(new Error('error'), 'rejected')
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
    });
  });
  describe('проверка обновления данных пользователя', () => {
    test('запрос завершился успешно', () => {
      const state = reducer(
        initialState,
        updateUser.fulfilled(userMockData, 'fulfilled', userMockData)
      );
      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(userMockData);
    });
  });
  describe('проверка входа пользователя в личный кабинет', () => {
    test('запрос выполняется', () => {
      const state = reducer(
        initialState,
        loginUser.pending('pending', loginMockData)
      );
      expect(state.isLoading).toBe(true);
    });
    test('успешное выполнение запроса', () => {
      const state = reducer(
        initialState,
        loginUser.fulfilled(userMockData, 'fulfilled', loginMockData)
      );
      expect(state.isAuthenticated).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(userMockData);
    });
    test('неуспешное выполнение запроса', () => {
      const state = reducer(
        initialState,
        loginUser.rejected(new Error('error'), 'rejected', loginMockData)
      );
      expect(state.isLoading).toBe(false);
      expect(state.loginError?.message).toEqual('error');
    });
  });
  describe('проверка выхода из личного кабинета', () => {
    test('выход из личного кабинета', () => {
      const state = reducer(
        initialState,
        logoutUser.fulfilled(undefined, 'fulfilled')
      );
      expect(state.data).toEqual({
        email: '',
        name: ''
      });
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
    });
  });
});
