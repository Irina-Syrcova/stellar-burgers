import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import feedsReducer, { getFeeds } from './feedsSlice';

describe('тест асинхронных экшенов feedsSlice', () => {
  const store = configureStore({
    reducer: { feeds: feedsReducer }
  });
  test('идет ли загрузка', async () => {
    store.dispatch({ type: getFeeds.pending.type });
    const state = store.getState();
    expect(state.feeds.loading).toBe(true);
  });
  test('успешность загрузки', async () => {
    const expectPayload = {
      total: 1
    };
    store.dispatch({
      type: getFeeds.fulfilled.type,
      payload: expectPayload
    });
    const state = store.getState();
    expect(state.feeds.total).toEqual(expectPayload.total);
  });
  test('обработка ошибок', async () => {
    const error = 'mocked error';
    store.dispatch({
      type: getFeeds.rejected.type,
      error: { message: error }
    });
    const state = store.getState();
    expect(state.feeds.error).toBe(error);
  });
});
