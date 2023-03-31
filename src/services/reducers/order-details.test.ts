import {
  TOrderDetailsActions,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED
} from '../actions/order-details';
import { orderDetailsReducer } from './order-details';

const initialState = {
  details: null,
  orderDetailsRequest: false,
  orderDetailsFailed: null
};
const orderDetails = {
  _id: '641f05e4936b17001be73661',
  owner: '63a9b84799a25c001cd6ddca',
  ingredients: [
    '60d3b41abdacab0026a733c7',
    '60d3b41abdacab0026a733cb',
    '60d3b41abdacab0026a733ce',
    '60d3b41abdacab0026a733c7'
  ],
  status: 'done' as 'done' | 'pending' | 'created' | 'canceled',
  name: 'Био-марсианский флюоресцентный традиционный-галактический бургер',
  createdAt: '2023-03-25T14:32:04.129Z',
  updatedAt: '2023-03-25T14:32:04.583Z',
  number: 45884,
  __v: 0,
};
const error = 'Error message';

describe('order details reducer', () => {
  it('should return the initial state', () => {
    expect(
      orderDetailsReducer(undefined, {} as TOrderDetailsActions)
    ).toEqual(initialState)
  });

  it('should handle GET_ORDER_DETAILS_REQUEST', () => {
    expect(orderDetailsReducer(initialState, {
      type: GET_ORDER_DETAILS_REQUEST
    })
    ).toEqual(
      {
        ...initialState,
        orderDetailsRequest: true
      }
    )
  });

  it('should handle GET_ORDER_DETAILS_SUCCESS', () => {
    expect(
      orderDetailsReducer(initialState, {
        type: GET_ORDER_DETAILS_SUCCESS,
        details: orderDetails
      })
    ).toEqual(
      {
        ...initialState,
        orderDetailsRequest: false,
        orderDetailsFailed: null,
        details: orderDetails
      }
    )
  });

  it('should handle GET_ORDER_DETAILS_FAILED', () => {
    expect(orderDetailsReducer(initialState, {
      type: GET_ORDER_DETAILS_FAILED,
      error: error
    })
    ).toEqual(
      {
        ...initialState,
        orderDetailsRequest: false,
        orderDetailsFailed: error,
        details: null
      }
    )
  });
});
