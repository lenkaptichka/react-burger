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
import { wsOrderFeedReducer } from './order-feed';
import { wsOrdersHistoryReducer } from './orders-history';
import { orderDetailsReducer } from './order-details';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  orderInformation: orderInformationReducer,
  ingredientDetails: ingredientDetailsReducer,
  token: tokenReducer,
  register: registerReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  logout: logoutReducer,
  userInformation: userReducer,
  wsOrderFeed: wsOrderFeedReducer,
  wsOrdersHistory: wsOrdersHistoryReducer,
  orderDetails: orderDetailsReducer
});