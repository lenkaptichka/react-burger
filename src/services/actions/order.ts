import { AppDispatch, TResponseError } from '../../utils/types';
import { orderApi } from '../../utils/api';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  orderNumber: number;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
  error: null | string;
}

export type TOrderActions = 
  IGetOrderRequestAction |
  IGetOrderSuccessAction |
  IGetOrderFailedAction;

export const sendOrder = (ingredients: Array<string>) => (dispatch: AppDispatch) => {
  dispatch({type: GET_ORDER_REQUEST})
  return orderApi(ingredients)
    .then(data => {
      if (data && data.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderNumber: data.order.number
        });
      }
    })
    .catch((error: TResponseError) => {
      dispatch({
        type: GET_ORDER_FAILED,
        error: error.message
      });
    })
}
