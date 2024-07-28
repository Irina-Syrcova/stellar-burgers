import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientReducer, { getIngredients } from './ingredientsSlice';

describe('тест асинхронных экшенов ingredientsSlice', () => {
  const store = configureStore({
    reducer: { ingredients: ingredientReducer }
  });
  test('идет ли загрузка', async () => {
    store.dispatch({ type: getIngredients.pending.type });
    const state = store.getState();
    expect(state.ingredients.loading).toBe(true);
  });
  test('успешность загрузки', async () => {
    const expectPayload = [
      {
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        _id: '643d69a5c3f7b9001cfa093e'
      }
    ];
    store.dispatch({
      type: getIngredients.fulfilled.type,
      payload: expectPayload
    });
    const state = store.getState();
    expect(state.ingredients.ingredients).toEqual(expectPayload);
  });
  test('обработка ошибок', async () => {
    const error = 'mocked error';
    store.dispatch({
      type: getIngredients.rejected.type,
      error: { message: error }
    });
    const state = store.getState();
    expect(state.ingredients.error).toBe(error);
  });
});
