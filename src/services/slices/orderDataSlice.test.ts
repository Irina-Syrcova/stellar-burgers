import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer, { getOrders } from './orderDataSlice';

describe('тест асинхронных экшенов orderDataSlice', () => {
  const store = configureStore({
    reducer: { order: orderReducer }
  });
  test('идет ли загрузка', async () => {
    store.dispatch({ type: getOrders.pending.type });
    const state = store.getState();
    expect(state.order.loading).toBe(true);
  });
  test('успешность загрузки', async () => {
    const expectPayload = {
      orders: { _id: '1234' }
    };
    store.dispatch({
      type: getOrders.fulfilled.type,
      payload: expectPayload
    });
    const state = store.getState();
    expect(state.order.orders).toEqual(expectPayload.orders);
  });
  test('обработка ошибок', async () => {
    const error = 'mocked error';
    store.dispatch({
      type: getOrders.rejected.type,
      error: { message: error }
    });
    const state = store.getState();
    expect(state.order.error).toBe(error);
  });
});
