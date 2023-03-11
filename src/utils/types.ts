import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../services/store';


import { TBurgerConstructorActions } from "../services/actions/burger-constructor";
import { TBurgerIngredientsActions } from '../services/actions/burger-ingredients';
import { TIngredientDetailsActions } from '../services/actions/ingredient-details';
import { TOrderActions } from '../services/actions/order';

export type TApplicationActions =
  TBurgerConstructorActions |
  TBurgerIngredientsActions |
  TIngredientDetailsActions |
  TOrderActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, never, TApplicationActions>;


export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TResponseError = {
  message: string;
}


export interface IIngredient {
  '_id': string;
  'name': string;
  'type': 'bun' | 'sauce' | 'main';
  'proteins': number;
  'fat': number;
  'carbohydrates': number;
  'calories': number;
  'price': number;
  'image': string;
  'image_mobile': string;
  'image_large': string;
  '__v': number
};



