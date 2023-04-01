import {
  TOrderFeedActions,
  ORDER_FEED_CONNECTION_SUCCESS,
  ORDER_FEED_CONNECTION_ERROR,
  ORDER_FEED_CONNECTION_CLOSED,
  ORDER_FEED_GET_MESSAGE
} from '../actions/order-feed';
import { initialState, wsOrderFeedReducer} from './order-feed';

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
}

describe('orders history reducer', () => {
  it('should return the initial state', () => {
    expect(
      wsOrderFeedReducer(undefined, {} as TOrderFeedActions)
    ).toEqual(initialState)
  });

  it('should handle ORDER_FEED_CONNECTION_SUCCESS', () => {
    expect(wsOrderFeedReducer(initialState, {
      type: ORDER_FEED_CONNECTION_SUCCESS
    })
    ).toEqual(
      {
        ...initialState,
        wsConnected: true,
        error: null
      }
    )
  });

  it('should handle ORDER_FEED_CONNECTION_ERROR', () => {
    expect(
      wsOrderFeedReducer(initialState, {
        type: ORDER_FEED_CONNECTION_ERROR,
        payload: error
      })
    ).toEqual(
      {
        ...initialState,
        error: error
      }
    )
  });

  it('should handle ORDER_FEED_CONNECTION_CLOSED', () => {
    expect(wsOrderFeedReducer(initialState, {type: ORDER_FEED_CONNECTION_CLOSED})
    ).toEqual(
      {
        ...initialState,
        wsConnected: false
      }
    )
  });

  it('should handle ORDER_FEED_GET_MESSAGE', () => {
    expect(wsOrderFeedReducer(initialState, {
      type: ORDER_FEED_GET_MESSAGE,
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
