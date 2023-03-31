import {
  TBurgerIngredientsActions,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/burger-ingredients';
import { ingredientsReducer } from './burger-ingredients';

const initialState = {
  allIngredients: [],
  ingredientsRequest: false,
  ingredientsFailed: null
};
const ingredients = [
  {
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
  }
];
const error = 'Error message';

describe('burger ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(
      ingredientsReducer(undefined, {} as TBurgerIngredientsActions)
    ).toEqual(initialState)
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(ingredientsReducer(initialState, {
      type: GET_INGREDIENTS_REQUEST
    })
    ).toEqual(
      {
        ...initialState,
        ingredientsRequest: true
      }
    )
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredientsReducer(initialState, {
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: ingredients
    })
    ).toEqual(
      {
        ...initialState,
        ingredientsRequest: false,
        ingredientsFailed: null,
        allIngredients: ingredients
      }
    )
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(ingredientsReducer(initialState, {
      type: GET_INGREDIENTS_FAILED,
      error: error
    })
    ).toEqual(
      {
        ...initialState,
        ingredientsRequest: false,
        ingredientsFailed: error,
        allIngredients: []
      }
    )
  });
});
