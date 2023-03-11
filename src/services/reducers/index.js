import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { selectedIngredientsReducer } from './burger-constructor';
import { orderInformationReducer } from './order';
import { ingredientDetailsReducer } from './ingredient-details';
import { userReducer } from './user';
import { tokenReducer } from './token';
import { registerReducer } from './register';
import { loginReducer } from './login';
import { forgotPasswordReducer } from './forgot-password';
import { resetPasswordReducer } from './reset-password';
import { logoutReducer } from './logout';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  orderInformation: orderInformationReducer,
  ingredientDetails: ingredientDetailsReducer,
  userInformation: userReducer,
  token: tokenReducer,
  register: registerReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  logout: logoutReducer
});