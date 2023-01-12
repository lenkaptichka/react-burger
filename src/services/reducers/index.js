import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { selectedIngredientsReducer } from './burger-constructor';
import { orderInformationReducer } from './order';
import { ingredientDetailsReducer } from './ingredient-details';
import { userReducer } from './user';
import { tokenReducer } from './token';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  orderInformation: orderInformationReducer,
  ingredientDetails: ingredientDetailsReducer,
  userInformation: userReducer,
  token: tokenReducer
});