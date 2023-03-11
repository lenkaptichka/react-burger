import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  TOrderActions
} from '../actions/order';

interface IOrderState {
  orderNumber: null | number;
  orderRequest: boolean;
  orderFailed: null | string;
}

const initialState: IOrderState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: null
}

export const orderInformationReducer = (state = initialState, action: TOrderActions): IOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {...state, orderRequest: true}
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: null,
        orderNumber: action.orderNumber
      }
    }
    case GET_ORDER_FAILED: {
      return {...state, orderRequest: false, orderFailed: action.error, orderNumber: null}
    }
    default:
      return state
  }
}