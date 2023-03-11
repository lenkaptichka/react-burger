import { INGREDIENT_API_URL } from '../../constants/constants';
import checkResponse from '../../utils/check-response';
import { AppDispatch, AppThunk, IIngredient, TResponseError, TServerResponse } from '../../utils/types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: Array<IIngredient>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  error: null | string;
}

export type TBurgerIngredientsActions = 
  IGetIngredientsRequestAction |
  IGetIngredientsSuccessAction |
  IGetIngredientsFailedAction;
  
type TGetIngredientsResponse = TServerResponse<{
  success: boolean;
  data: Array<IIngredient>;
}>

export const getIngredients = (): AppThunk  => {
  return function(dispatch: AppDispatch) {
    dispatch({type: GET_INGREDIENTS_REQUEST});

    fetch(`${INGREDIENT_API_URL}/ingredients`)
      .then(checkResponse<TGetIngredientsResponse>)
      .then(data => dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: data.data
      }))
      .catch((error: TResponseError) => dispatch({
        type: GET_INGREDIENTS_FAILED,
        error: error.message
      }))
  }
}