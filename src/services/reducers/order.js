import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../actions/order';

const initialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: null
}

export const orderInformationReducer = (state = initialState, action) => {
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
      return {...state, orderRequest: false, orderFailed: action.error.message, orderNumber: null}
    }
    default:
      return state
  }
}