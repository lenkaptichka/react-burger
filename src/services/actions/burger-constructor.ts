import { IIngredient } from '../../utils/types';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: IIngredient;
  readonly key: string;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly ingredientKey: string;
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  readonly dragIngredient: string;
  readonly dropIngredient: string;
}

export type TBurgerConstructorActions = 
  IAddIngredientAction |
  IDeleteIngredientAction |
  IMoveIngredientAction;


export const addIngredient = (ingredient: IIngredient, key: string): IAddIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    ingredient,
    key
  }
}

export const deleteIngredient = (ingredientKey: string): IDeleteIngredientAction => {
  return {
    type: DELETE_INGREDIENT,
    ingredientKey
  }
}

export const moveIngredient = (dragIngredient: string, dropIngredient: string): IMoveIngredientAction => {
  return {
    type: MOVE_INGREDIENT,
    dragIngredient,
    dropIngredient
  }
}
