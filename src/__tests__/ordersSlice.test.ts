import reducer, {
  createOrder,
  getOrder,
  getOrders,
  initialState,
  resetOrderModalData
} from '../services/slices/orders';
import { orderMockData } from './mockData';

describe('тестирование ordersReducer ', () => {
  describe('проверка асинхронной функции получения заказов', () => {
    test('выполнение запроса', () => {
      const state = reducer(initialState, getOrders.pending('pending'));
      expect(state.isOrdersLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    test('успешное получение заказов', () => {
      const state = reducer(
        initialState,
        getOrders.fulfilled(orderMockData, 'fulfilled')
      );
      expect(state.isOrdersLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.data).toEqual(orderMockData);
    });
    test('ошибка получения заказов', () => {
      const state = reducer(
        initialState,
        getOrders.rejected(new Error('Ошибка получения заказов'), 'rejected')
      );
      expect(state.isOrdersLoading).toBe(false);
      expect(state.error).toBe('Ошибка получения заказов');
    });
  });

  describe('проверка асинхронной функции получения одного заказа', () => {
    test('выполнение запроса', () => {
      const state = reducer(
        initialState,
        getOrder.pending('pending', orderMockData[0].number)
      );
      expect(state.isOrderLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    test('успешное получение заказа', () => {
      const state = reducer(
        initialState,
        getOrder.fulfilled(
          orderMockData[0],
          'fulfilled',
          orderMockData[0].number
        )
      );
      expect(state.isOrderLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orderModalData).toEqual(orderMockData[0]);
    });
    test('ошибка получения заказа', () => {
      const state = reducer(
        initialState,
        getOrder.rejected(
          new Error('Ошибка получения заказа'),
          'rejected',
          -100
        )
      );
      expect(state.isOrderLoading).toBe(false);
    });
  });

  describe('проверка сброса модального окна заказа', () => {
    const state = reducer(
      {
        ...initialState,
        orderModalData: orderMockData[0]
      },
      resetOrderModalData()
    );
    expect(state.orderModalData).toBeNull();
  });

  describe('проверка создания заказа', () => {
    test('выполнение запроса', () => {
      const state = reducer(
        initialState,
        createOrder.pending('pending', orderMockData[0].ingredients)
      );
      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });
    test('успешное создание заказа', () => {
      const state = reducer(
        initialState,
        createOrder.fulfilled(
          { order: orderMockData[0], name: 'EXAMPLE' },
          'fulfilled',
          orderMockData[0].ingredients
        )
      );
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orderModalData).toEqual(orderMockData[0]);
    });
    test('ошибка создания заказа', () => {
      const state = reducer(
        initialState,
        createOrder.rejected(
          new Error('Ошибка создания заказа'),
          'rejected',
          []
        )
      );
      expect(state.orderRequest).toBe(false);
    });
  });
});
