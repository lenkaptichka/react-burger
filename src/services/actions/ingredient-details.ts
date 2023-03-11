import { IIngredient } from "../../utils/types";

export const ADD_INGREDIENT_DETAILS: 'ADD_INGREDIENT_DETAILS' = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS: 'DELETE_INGREDIENT_DETAILS' = 'DELETE_INGREDIENT_DETAILS';

export interface IAddIngredientDetailsAction {
  readonly type: typeof ADD_INGREDIENT_DETAILS;
  readonly ingredient: IIngredient;
}

export interface IDeleteIngredientDetailsAction {
  readonly type: typeof DELETE_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions = IAddIngredientDetailsAction | IDeleteIngredientDetailsAction;

export const addIngredientDetails = (ingredient: IIngredient): IAddIngredientDetailsAction => {
  return {
    type: ADD_INGREDIENT_DETAILS,
    ingredient
  }
}

export const deleteIngredientDetails = (): IDeleteIngredientDetailsAction => {
  return {type: DELETE_INGREDIENT_DETAILS}
}