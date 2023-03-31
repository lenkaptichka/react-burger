import {
  TIngredientDetailsActions,
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS
} from '../actions/ingredient-details';
import { ingredientDetailsReducer } from './ingredient-details';

const initialState = {
  ingredient: null
};
const ingredient = {
  _id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: 'bun' as 'bun' | 'sauce' | 'main',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

describe('ingredient details reducer', () => {
  it('should return the initial state', () => {
    expect(
      ingredientDetailsReducer(undefined, {} as TIngredientDetailsActions)
    ).toEqual(initialState)
  });

  it('should handle ADD_INGREDIENT_DETAILS', () => {
    expect(ingredientDetailsReducer(initialState, {
      type: ADD_INGREDIENT_DETAILS,
      ingredient: ingredient
    })
    ).toEqual({ingredient: ingredient})
  });

  it('should handle DELETE_INGREDIENT_DETAILS', () => {
    expect(
      ingredientDetailsReducer(initialState, {type: DELETE_INGREDIENT_DETAILS})
    ).toEqual({ingredient: null})
  });
});
