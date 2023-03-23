import { IIngredient } from '../../utils/types';
import {
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
  TIngredientDetailsActions
} from '../actions/ingredient-details';

interface IIngredientDetailsState {
  ingredient: IIngredient | null;
}

const initialState = {
  ingredient: null
}

export const ingredientDetailsReducer = (state: IIngredientDetailsState = initialState, action: TIngredientDetailsActions): IIngredientDetailsState => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredient: action.ingredient
      }
    }
    case DELETE_INGREDIENT_DETAILS: {
      return {...state, ingredient: null}
    }
    default:
      return state
  }
}