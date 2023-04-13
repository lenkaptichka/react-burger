import {
  TBurgerConstructorActions,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT
} from '../actions/burger-constructor';
import { initialState, selectedIngredientsReducer } from './burger-constructor';

const bunIngredient = {
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
const otherIngredient = {
  _id: '60d3b41abdacab0026a733cc',
  name: 'Соус Spicy-X',
  type: 'sauce' as 'bun' | 'sauce' | 'main',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0
};
const firstKey = 'first-key';
const secondKey = 'second-key';

const stateWithIngredients = {
  bun: ['bun-id'],
  otherItems: [
    {
      _id: 'first-ingredient-id',
      key: firstKey
    },
    {
      _id: 'second-ingredient-id',
      key: secondKey
    }
  ]
}

describe('burger constructor reducer', () => {
  it('should return the initial state', () => {
    expect(
      selectedIngredientsReducer(undefined, {} as TBurgerConstructorActions)
    ).toEqual(initialState)
  });

  it('should handle ADD_INGREDIENT with `bun` type', () => {
    expect(selectedIngredientsReducer(initialState, {
      type: ADD_INGREDIENT,
      ingredient: bunIngredient,
      key: firstKey
    })
    ).toEqual(
      {
        ...initialState,
        bun: [bunIngredient._id]
      }
    )
  });

  it('should handle ADD_INGREDIENT with other types', () => {
    expect(selectedIngredientsReducer(initialState, {
      type: ADD_INGREDIENT,
      ingredient: otherIngredient,
      key: firstKey
    })
    ).toEqual(
      {
        ...initialState,
        otherItems: [...initialState.otherItems,
          {
            _id: otherIngredient._id,
            key: firstKey
          }
        ]
      }
    )
  });

  it('should handle DELETE_INGREDIENT', () => {
    expect(selectedIngredientsReducer(stateWithIngredients, {
      type: DELETE_INGREDIENT,
      ingredientKey: firstKey
    })
    ).toEqual(
      {
        ...stateWithIngredients,
        otherItems: [
          {
            _id: 'second-ingredient-id',
            key: secondKey
          }
        ]
      }
    )
  });

  it('should handle MOVE_INGREDIENT when the element`s drag index is less than the element`s drop index', () => {
    expect(selectedIngredientsReducer(stateWithIngredients, {
      type: MOVE_INGREDIENT,
      dragIngredient: firstKey,
      dropIngredient: secondKey
    })
    ).toEqual(
      {
        ...stateWithIngredients,
        otherItems: [
          {
            _id: 'second-ingredient-id',
            key: secondKey
          },
          {
            _id: 'first-ingredient-id',
            key: firstKey
          }
        ]
      }
    )
  });

  it('should handle MOVE_INGREDIENT when the element`s drop index is less than the element`s drag index', () => {
    expect(selectedIngredientsReducer(stateWithIngredients, {
      type: MOVE_INGREDIENT,
      dragIngredient: secondKey,
      dropIngredient: firstKey
    })
    ).toEqual(
      {
        ...stateWithIngredients,
        otherItems: [
          {
            _id: 'second-ingredient-id',
            key: secondKey
          },
          {
            _id: 'first-ingredient-id',
            key: firstKey
          }
        ]
      }
    )
  });
});
