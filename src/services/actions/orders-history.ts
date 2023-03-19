import { IOrderData } from "../../utils/types";

export const ORDERS_HISTORY_CONNECTION_START: 'ORDERS_HISTORY_CONNECTION_START' = 'ORDERS_HISTORY_CONNECTION_START';
export const ORDERS_HISTORY_CONNECTION_CLOSE: 'ORDERS_HISTORY_CONNECTION_CLOSE' = 'ORDERS_HISTORY_CONNECTION_CLOSE';

export const ORDERS_HISTORY_CONNECTION_SUCCESS: 'ORDERS_HISTORY_CONNECTION_SUCCESS' = 'ORDERS_HISTORY_CONNECTION_SUCCESS';
export const ORDERS_HISTORY_CONNECTION_ERROR: 'ORDERS_HISTORY_CONNECTION_ERROR' = 'ORDERS_HISTORY_CONNECTION_ERROR';
export const ORDERS_HISTORY_CONNECTION_CLOSED: 'ORDERS_HISTORY_CONNECTION_CLOSED' = 'ORDERS_HISTORY_CONNECTION_CLOSED';
export const ORDERS_HISTORY_GET_MESSAGE: 'ORDERS_HISTORY_GET_MESSAGE' = 'ORDERS_HISTORY_GET_MESSAGE';


export interface IOrdersHistoryConnectionStartAction {
  readonly type: typeof ORDERS_HISTORY_CONNECTION_START;
  payload: string;
};

export interface IOrdersHistoryConnectionCloseAction {
  readonly type: typeof ORDERS_HISTORY_CONNECTION_CLOSE;
};


export interface IOrdersHistoryConnectionSuccessAction {
  readonly type: typeof ORDERS_HISTORY_CONNECTION_SUCCESS;
};

export interface IOrdersHistoryConnectionErrorAction {
  readonly type: typeof ORDERS_HISTORY_CONNECTION_ERROR;
  payload: string;
};

export interface IOrdersHistoryConnectionClosedAction {
  readonly type: typeof ORDERS_HISTORY_CONNECTION_CLOSED;
}

export interface IOrdersHistoryGetMessageAction {
  readonly type: typeof ORDERS_HISTORY_GET_MESSAGE;
  payload: IOrderData;
};

export type TOrdersHistoryActions =
  IOrdersHistoryConnectionStartAction |
  IOrdersHistoryConnectionCloseAction |
  IOrdersHistoryConnectionSuccessAction |
  IOrdersHistoryConnectionErrorAction |
  IOrdersHistoryConnectionClosedAction |
  IOrdersHistoryGetMessageAction;

export type TwsOrdersHistoryActions = {
  wsInit: typeof ORDERS_HISTORY_CONNECTION_START,
  wsClose: typeof ORDERS_HISTORY_CONNECTION_CLOSE,
  onOpen: typeof ORDERS_HISTORY_CONNECTION_SUCCESS,
  onClose: typeof ORDERS_HISTORY_CONNECTION_CLOSED,
  onError: typeof ORDERS_HISTORY_CONNECTION_ERROR,
  onMessage: typeof ORDERS_HISTORY_GET_MESSAGE
}

export const ordersHistoryConnectionStart = (url: string): IOrdersHistoryConnectionStartAction => {
  return {
    type: ORDERS_HISTORY_CONNECTION_START,
    payload: url,
  };
};

export const ordersHistoryConnectionClose = (): IOrdersHistoryConnectionCloseAction => {
  return {
    type: ORDERS_HISTORY_CONNECTION_CLOSE
  }
}

export const OrdersHistoryActions = {
  wsInit: ORDERS_HISTORY_CONNECTION_START,
  wsClose: ORDERS_HISTORY_CONNECTION_CLOSE,
  onOpen: ORDERS_HISTORY_CONNECTION_SUCCESS,
  onClose: ORDERS_HISTORY_CONNECTION_CLOSED,
  onError: ORDERS_HISTORY_CONNECTION_ERROR,
  onMessage: ORDERS_HISTORY_GET_MESSAGE
}


