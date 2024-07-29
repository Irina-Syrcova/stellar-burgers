import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { forgotPassword, getUser, loginUser, logout, registerUser, resetPasswor, updateUser, userOrders } from './userSlice';

describe('тест асинхронных экшенов orderDataSlice', () => {
  const store = configureStore({
    reducer: { userInfo: userReducer }
  });

  test('идет ли загрузка registerUser', async () => {
    store.dispatch({ type: registerUser.pending.type });
    const state = store.getState();
    expect(state.userInfo.loading).toBe(true);
  });
  test('успешность загрузки registerUser', async () => {
    const expectPayload = {
      user: { email: 'email', name: 'name' }
    };
    store.dispatch({
      type: registerUser.fulfilled.type,
      payload: expectPayload
    });
    const state = store.getState();
    expect(state.userInfo.user).toEqual(expectPayload.user);
  });
  test('обработка ошибок registerUser', async () => {
    const error = 'mocked error';
    store.dispatch({
      type: registerUser.rejected.type,
      error: { message: error }
    });
    const state = store.getState();
    expect(state.userInfo.error).toBe(error);
  });
  test('идет ли загрузка loginUser', async () => {
    store.dispatch({ type: loginUser.pending.type });
    const state = store.getState();
    expect(state.userInfo.loading).toBe(true);
  });
  test('успешность загрузки loginUser', async () => {
    
    const expectPayload = {
        user: { email: 'email', name: 'name' }
    };
    store.dispatch({
      type: loginUser.fulfilled.type,
      payload: expectPayload
    });
    const state = store.getState();
    expect(state.userInfo.user).toEqual(expectPayload.user);
    
  });
  test('обработка ошибок loginUser', async () => {
    const error = 'mocked error';
    store.dispatch({
      type: loginUser.rejected.type,
      error: { message: error }
    });
    const state = store.getState();
    expect(state.userInfo.error).toBe(error);
  });

  test('идет ли загрузка forgotPassword', async () => {
    store.dispatch({ type: forgotPassword.pending.type });
    const state = store.getState();
    expect(state.userInfo.loading).toBe(true);
  });
  test('успешность загрузки forgotPassword', async () => {
    store.dispatch({
      type: forgotPassword.fulfilled.type});
    const state = store.getState();
    expect(state.userInfo.loading).toBeFalsy();
    
  });
  test('обработка ошибок forgotPassword', async () => {
    const error = 'mocked error';
    store.dispatch({
      type: forgotPassword.rejected.type,
      error: { message: error }
    });
    const state = store.getState();
    expect(state.userInfo.error).toBe(error);
  });

  test('идет ли загрузка resetPasswor', async () => {
    store.dispatch({ type: resetPasswor.pending.type });
    const state = store.getState();
    expect(state.userInfo.loading).toBe(true);
  });
  test('успешность загрузки resetPasswor', async () => {
    store.dispatch({
      type: resetPasswor.fulfilled.type});
    const state = store.getState();
    expect(state.userInfo.loading).toBeFalsy();
    
  });
  test('обработка ошибок resetPasswor', async () => {
    const error = 'mocked error';
    store.dispatch({
      type: resetPasswor.rejected.type,
      error: { message: error }
    });
    const state = store.getState();
    expect(state.userInfo.error).toBe(error);
  });

  test('идет ли загрузка getUser', async () => {
    store.dispatch({ type: getUser.pending.type });
    const state = store.getState();
    expect(state.userInfo.loading).toBe(true);
  });
  test('успешность загрузки getUser', async () => {
    
    const expectPayload = {
        user: { email: 'email', name: 'name' }
    };
    store.dispatch({
      type: getUser.fulfilled.type,
      payload: expectPayload
    });
    const state = store.getState();
    expect(state.userInfo.user).toEqual(expectPayload.user);
    
  });
  test('обработка ошибок getUser', async () => {
    const error = 'mocked error';
    store.dispatch({
      type: getUser.rejected.type,
      error: { message: error }
    });
    const state = store.getState();
    expect(state.userInfo.error).toBe(error);
  });

  test('идет ли загрузка updateUser', async () => {
    store.dispatch({ type: updateUser.pending.type });
    const state = store.getState();
    expect(state.userInfo.loading).toBe(true);
  });
  test('успешность загрузки updateUser', async () => {
    
    const expectPayload = {
        user: { email: 'email', name: 'name' }
    };
    store.dispatch({
      type: updateUser.fulfilled.type,
      payload: expectPayload
    });
    const state = store.getState();
    expect(state.userInfo.user).toEqual(expectPayload.user);
    
  });
  test('обработка ошибок updateUser', async () => {
    const error = 'mocked error';
    store.dispatch({
      type: updateUser.rejected.type,
      error: { message: error }
    });
    const state = store.getState();
    expect(state.userInfo.error).toBe(error);
  });

  test('идет ли загрузка logout', async () => {
    store.dispatch({ type: logout.pending.type });
    const state = store.getState();
    expect(state.userInfo.loading).toBe(true);
  });
  test('успешность загрузки logout', async () => {
    store.dispatch({
      type: logout.fulfilled.type
    });
    const state = store.getState();
    expect(state.userInfo.user).toBeNull;
    
  });
  test('обработка ошибок logout', async () => {
    const error = 'mocked error';
    store.dispatch({
      type: logout.rejected.type,
      error: { message: error }
    });
    const state = store.getState();
    expect(state.userInfo.error).toBe(error);
  });

  test('идет ли загрузка userOrders', async () => {
    store.dispatch({ type: userOrders.pending.type });
    const state = store.getState();
    expect(state.userInfo.loading).toBe(true);
  });
  test('успешность загрузки userOrders', async () => {
    
    const expectPayload = {
        orders: [{ name: 'моковый заказ' }]
    };
    store.dispatch({
      type: userOrders.fulfilled.type,
      payload: expectPayload
    });
    const state = store.getState();
    expect(state.userInfo.orders).toEqual(expectPayload);
    
  });
  test('обработка ошибок userOrders', async () => {
    const error = 'mocked error';
    store.dispatch({
      type: userOrders.rejected.type,
      error: { message: error }
    });
    const state = store.getState();
    expect(state.userInfo.error).toBe(error);
  });
});
