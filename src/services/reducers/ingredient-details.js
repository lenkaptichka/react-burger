import {
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS
} from '../actions/ingredient-details';

const initialState = {
  ingredient: null
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredient: {
          name: action.ingredient.name,
          calories: action.ingredient.calories,
          proteins: action.ingredient.proteins,
          fat: action.ingredient.fat,
          carbohydrates: action.ingredient.carbohydrates,
          image: action.ingredient.image_large
        }
      }
    }
    case DELETE_INGREDIENT_DETAILS: {
      return {...state, ingredient: null}
    }
    default:
      return state
  }
}