import {
  TOrdersHistoryActions,
  ORDERS_HISTORY_CONNECTION_SUCCESS,
  ORDERS_HISTORY_CONNECTION_ERROR,
  ORDERS_HISTORY_CONNECTION_CLOSED,
  ORDERS_HISTORY_GET_MESSAGE
} from '../actions/orders-history';
import { wsOrdersHistoryReducer } from './orders-history';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: null
};
const error = 'Error message';
const historyMessage = {
  orders: [
    {
      _id: '641f40ae936b17001be7371c',
      ingredients: [
        '60d3b41abdacab0026a733c7',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733cb',
        '60d3b41abdacab0026a733c7'
      ],
      status: 'done' as 'done' | 'pending' | 'created' | 'canceled',
      name: 'Био-марсианский флюоресцентный традиционный-галактический бургер',
      createdAt: '2023-03-25T18:42:54.211Z',
      updatedAt: '2023-03-25T18:42:54.659Z',
      number: 45914
    }
  ],
  total: 4000,
  totalToday: 100
};

describe('orders history reducer', () => {
  it('should return the initial state', () => {
    expect(
      wsOrdersHistoryReducer(undefined, {} as TOrdersHistoryActions)
    ).toEqual(initialState)
  });

  it('should handle ORDERS_HISTORY_CONNECTION_SUCCESS', () => {
    expect(wsOrdersHistoryReducer(initialState, {
      type: ORDERS_HISTORY_CONNECTION_SUCCESS
    })
    ).toEqual(
      {
        ...initialState,
        wsConnected: true,
        error: null
      }
    )
  });

  it('should handle ORDERS_HISTORY_CONNECTION_ERROR', () => {
    expect(
      wsOrdersHistoryReducer(initialState, {
        type: ORDERS_HISTORY_CONNECTION_ERROR,
        payload: error
      })
    ).toEqual(
      {
        ...initialState,
        error: error
      }
    )
  });

  it('should handle ORDERS_HISTORY_CONNECTION_CLOSED', () => {
    expect(wsOrdersHistoryReducer(initialState, {type: ORDERS_HISTORY_CONNECTION_CLOSED})
    ).toEqual(
      {
        ...initialState,
        wsConnected: false
      }
    )
  });

  it('should handle ORDERS_HISTORY_GET_MESSAGE', () => {
    expect(wsOrdersHistoryReducer(initialState, {
      type: ORDERS_HISTORY_GET_MESSAGE,
      payload: historyMessage
    })
    ).toEqual(
      {
        ...initialState,
        orders: historyMessage.orders,
        total: historyMessage.total,
        totalToday: historyMessage.totalToday,
      }
    )
  });
});