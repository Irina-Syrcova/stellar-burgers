import { describe, expect, test } from '@jest/globals';
import { rootReducer } from '../store';
import { constructorInitialState } from '../slices/constructorSlice';
import { ingredientsInitialState } from '../slices/ingredientsSlice';
import { feedsInitialState } from './feedsSlice';
import { orderDataInitialState } from './orderDataSlice';
import { userInitialState } from './userSlice';

describe('rootReducer', () => {
  const initialState = {
    orderConstructor: { ...constructorInitialState },
    ingredients: { ...ingredientsInitialState },
    feeds: { ...feedsInitialState },
    order: { ...orderDataInitialState },
    userInfo: { ...userInitialState }
  };
  test('Правильная ли инициализациюя', () => {
    const state = rootReducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });
});
