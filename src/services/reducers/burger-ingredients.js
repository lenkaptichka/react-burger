import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/burger-ingredients';

const initialState = {
  allIngredients: [],
  ingredientsRequest: false,
  ingredientsFailed: null
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {...state, ingredientsRequest: true}
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: null,
        allIngredients: action.ingredients
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {...state, ingredientsRequest: false, ingredientsFailed: action.error.message, allIngredients: []}
    }
    default:
      return state

  }
}