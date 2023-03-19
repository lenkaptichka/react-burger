import { IOrder } from '../../utils/types';
import {
  ORDERS_HISTORY_CONNECTION_SUCCESS,
  ORDERS_HISTORY_CONNECTION_ERROR,
  ORDERS_HISTORY_CONNECTION_CLOSED,
  ORDERS_HISTORY_GET_MESSAGE,
  TOrdersHistoryActions
} from '../actions/orders-history';

interface IOrdersHistoryState {
  orders: Array<IOrder>,
  total: number,
  totalToday: number,
  wsConnected: boolean,
  error: null | string
};

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: null
};

export const wsOrdersHistoryReducer = (state: IOrdersHistoryState = initialState, action: TOrdersHistoryActions): IOrdersHistoryState => {
  switch (action.type) {
    case ORDERS_HISTORY_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        error: null
      }
    }
    case ORDERS_HISTORY_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }

    case ORDERS_HISTORY_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false
      }
    }
    case ORDERS_HISTORY_GET_MESSAGE: {
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