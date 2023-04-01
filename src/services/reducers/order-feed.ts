import { IOrder } from '../../utils/types';
import {
  ORDER_FEED_CONNECTION_SUCCESS,
  ORDER_FEED_CONNECTION_ERROR,
  ORDER_FEED_CONNECTION_CLOSED,
  ORDER_FEED_GET_MESSAGE,
  TOrderFeedActions
} from '../actions/order-feed';

interface IOrderFeedState {
  orders: Array<IOrder>,
  total: number,
  totalToday: number,
  wsConnected: boolean,
  error: null | string
};

export const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: null
}

export const wsOrderFeedReducer = (state: IOrderFeedState = initialState, action: TOrderFeedActions): IOrderFeedState => {
  switch (action.type) {
    case ORDER_FEED_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        error: null
      }
    }
    case ORDER_FEED_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }

    case ORDER_FEED_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false
      }
    }
    case ORDER_FEED_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      }
    }

    default: {
      return state;
    }
  }
}