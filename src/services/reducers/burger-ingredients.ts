import { IIngredient } from '../../utils/types';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  TBurgerIngredientsActions
} from '../actions/burger-ingredients';


interface IBurgerIngredientsState {
  allIngredients: Array<IIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: null | string;
}

const initialState: IBurgerIngredientsState = {
  allIngredients: [],
  ingredientsRequest: false,
  ingredientsFailed: null
}

export const ingredientsReducer = (state = initialState, action: TBurgerIngredientsActions): IBurgerIngredientsState => {
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
      return {...state, ingredientsRequest: false, ingredientsFailed: action.error, allIngredients: []}
    }
    default:
      return state

  }
}