import { describe, expect, test } from '@jest/globals';
import constructorReducer, {
  addIngredient,
  constructorInitialState,
  moveDownIngridient,
  moveUpIngridient,
  removeIngridient
} from './constructorSlice';

describe('слайс конструктора', () => {
  test('обработка экшена добавления ингредиента', () => {
    const initialState = {
      ...constructorInitialState
    };
    const ingredient = {
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      _id: '643d69a5c3f7b9001cfa093e'
    };
    const newState = constructorReducer(initialState, {
      type: addIngredient.type,
      payload: { ...ingredient, id: '1' }
    });
    const { constructorItems } = newState;

    expect(constructorItems).toEqual({
      bun: null,
      ingredients: [{ ...ingredient, id: '1' }]
    });
  });

  test('обработка экшена удаления ингредиента', () => {
    const ingredient = {
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      _id: '643d69a5c3f7b9001cfa093e',
      id: '1'
    };
    const initialState = {
      ...constructorInitialState,
      constructorItems: {
        bun: null,
        ingredients: [ingredient]
      }
    };
    const newState = constructorReducer(
      initialState,
      removeIngridient(ingredient)
    );
    const { constructorItems } = newState;

    expect(constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
  });

  describe('обработка экшена изменения порядка ингредиентов в начинке', () => {
    const ingredient1 = {
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      _id: '643d69a5c3f7b9001cfa093e',
      id: '1'
    };
    const ingredient2 = {
      ...ingredient1,
      id: '2'
    };
    const initialState = {
      ...constructorInitialState,
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      }
    };
    test('сдвиг вниз ингредиента', () => {
      const newState = constructorReducer(
        initialState,
        moveDownIngridient(ingredient1)
      );
      const { constructorItems } = newState;

      expect(constructorItems).toEqual({
        bun: null,
        ingredients: [ingredient2, ingredient1]
      });
    });

    test('сдвиг вверх ингредиента', () => {
      const newState = constructorReducer(
        initialState,
        moveUpIngridient(ingredient1)
      );
      const { constructorItems } = newState;

      expect(constructorItems).toEqual({
        bun: null,
        ingredients: [ingredient1, ingredient2]
      });
    });
  });
});
