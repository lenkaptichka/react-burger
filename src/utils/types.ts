import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../services/store';


import { TBurgerConstructorActions } from "../services/actions/burger-constructor";
import { TBurgerIngredientsActions } from '../services/actions/burger-ingredients';
import { TIngredientDetailsActions } from '../services/actions/ingredient-details';
import { TOrderActions } from '../services/actions/order';
import { TRegisterActions } from '../services/actions/register';
import { TLoginActions } from '../services/actions/login';
import { TForgotPasswordActions } from '../services/actions/forgot-password';
import { TResetPasswordActions } from '../services/actions/reset-password';
import { TLogoutActions } from '../services/actions/logout';
import { TUserActions } from '../services/actions/user';

export type TApplicationActions =
  TBurgerConstructorActions |
  TBurgerIngredientsActions |
  TIngredientDetailsActions |
  TOrderActions |
  TRegisterActions |
  TLoginActions |
  TForgotPasswordActions |
  TResetPasswordActions |
  TLogoutActions |
  TUserActions;

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

export interface IRegisterFormState {
  email: string;
  password: string;
  name: string;
}

export interface ILoginFormState {
  email: string;
  password: string;
}

export interface IForgotPasswordFormState {
  email: string;
}

export interface IResetPasswordFormState {
  password: string;
  token: string;
}

export interface IUserData {
  email: string;
  name: string
}

export interface IEditUserDataFormState {
  email: string;
  name: string;
  password: string
}