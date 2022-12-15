import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { selectedIngredientsReducer } from './burger-constructor';
import { orderInformationReducer } from './order';
import { ingredientDetailsReducer } from './ingredient-details';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  orderInformation: orderInformationReducer,
  ingredientDetails: ingredientDetailsReducer
});