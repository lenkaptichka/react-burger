import { INGREDIENT_API_URL } from '../../constants/constants';
import checkResponse from '../../utils/check-response';
import { AppDispatch, AppThunk, IOrderDetails, TResponseError, TServerResponse } from '../../utils/types';

export const GET_ORDER_DETAILS_REQUEST: 'GET_ORDER_DETAILS_REQUEST' = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS: 'GET_ORDER_DETAILS_SUCCESS' = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED: 'GET_ORDER_DETAILS_FAILED' = 'GET_ORDER_DETAILS_FAILED';

export interface IGetOrderDetailsRequestAction {
  readonly type: typeof GET_ORDER_DETAILS_REQUEST;
}

export interface IGetOrderDetailsSuccessAction {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
  details: any
}

export interface IGetOrderDetailsFailedAction {
  readonly type: typeof GET_ORDER_DETAILS_FAILED;
  error: null | string;
}

export type TOrderDetailsActions = 
  IGetOrderDetailsRequestAction |
  IGetOrderDetailsSuccessAction |
  IGetOrderDetailsFailedAction;

type TGetOrderDetailsResponse = TServerResponse<{
  success: boolean;
  orders: Array<IOrderDetails>;
}>

export const getOrderDetails = (orderNumber: string): AppThunk  => {
  return function(dispatch: AppDispatch) {
    dispatch({type: GET_ORDER_DETAILS_REQUEST});

    fetch(`${INGREDIENT_API_URL}/orders/${orderNumber}`)
      .then(checkResponse<TGetOrderDetailsResponse>)
      .then(data => dispatch({
        type: GET_ORDER_DETAILS_SUCCESS,
        details: data.orders[0]
      }))
      .catch((error: TResponseError) => dispatch({
        type: GET_ORDER_DETAILS_FAILED,
        error: error.message
      }))
  }
}