import {
  TOrderActions,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED 
} from '../actions/order';
import { orderInformationReducer } from './order';

export const initialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: null
};
const error = 'Error message';
const orderNumber = 9999;

describe('register reducer', () => {
  it('should return the initial state', () => {
    expect(
      orderInformationReducer(undefined, {} as TOrderActions)
    ).toEqual(initialState)
  });

  it('should handle GET_ORDER_REQUEST', () => {
    expect(orderInformationReducer(initialState, {
      type: GET_ORDER_REQUEST
    })
    ).toEqual(
      {
        ...initialState,
        orderRequest: true
      }
    )
  });

  it('should handle GET_ORDER_SUCCESS', () => {
    expect(
      orderInformationReducer(initialState, {
        type: GET_ORDER_SUCCESS,
        orderNumber: orderNumber
      })
    ).toEqual(
      {
        ...initialState,
        orderRequest: false,
        orderFailed: null,
        orderNumber: orderNumber
      }
    )
  });

  it('should handle GET_ORDER_FAILED', () => {
    expect(orderInformationReducer(initialState, {
      type: GET_ORDER_FAILED,
      error: error
    })
    ).toEqual(
      {
        ...initialState,
        orderRequest: false,
        orderFailed: error,
        orderNumber: null
      }
    )
  });
});
