import { IOrderDetails } from '../../utils/types';
import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  TOrderDetailsActions
} from '../actions/order-details';

interface IOrderDetailsState {
  details: null | IOrderDetails;
  orderDetailsRequest: boolean;
  orderDetailsFailed: null | string;
}

export const initialState: IOrderDetailsState = {
  details: null,
  orderDetailsRequest: false,
  orderDetailsFailed: null
}

export const orderDetailsReducer = (state: IOrderDetailsState = initialState, action: TOrderDetailsActions): IOrderDetailsState => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {...state, orderDetailsRequest: true}
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsFailed: null,
        details: action.details
      }
    }
    case GET_ORDER_DETAILS_FAILED: {
      return {...state, orderDetailsRequest: false, orderDetailsFailed: action.error, details: null}
    }
    default:
      return state

  }
}