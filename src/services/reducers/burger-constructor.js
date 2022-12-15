import { ADD_INGREDIENT, DELETE_INGREDIENT } from '../actions/burger-constructor';

const initialState = {
  bun: [],
  otherIngredients: []
}

export const selectedIngredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_INGREDIENT: {
      if (action.ingredient.type === 'bun') {
        return {...state, bun: [action.ingredient._id]}
      } else {
        return {...state, otherIngredients: [...state.otherIngredients, action.ingredient._id]}
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        otherIngredients: state.otherIngredients
          .filter((item, index) => index !== action.ingredientIndex)
      }
    }
    default:
      return state
  }
}