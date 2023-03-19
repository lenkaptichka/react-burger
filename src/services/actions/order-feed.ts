import { IOrderData } from "../../utils/types";

export const ORDER_FEED_CONNECTION_START: 'ORDER_FEED_CONNECTION_START' = 'ORDER_FEED_CONNECTION_START';
export const ORDER_FEED_CONNECTION_CLOSE: 'ORDER_FEED_CONNECTION_CLOSE' = 'ORDER_FEED_CONNECTION_CLOSE';

export const ORDER_FEED_CONNECTION_SUCCESS: 'ORDER_FEED_CONNECTION_SUCCESS' = 'ORDER_FEED_CONNECTION_SUCCESS';
export const ORDER_FEED_CONNECTION_ERROR: 'ORDER_FEED_CONNECTION_ERROR' = 'ORDER_FEED_CONNECTION_ERROR';
export const ORDER_FEED_CONNECTION_CLOSED: 'ORDER_FEED_CONNECTION_CLOSED' = 'ORDER_FEED_CONNECTION_CLOSED';
export const ORDER_FEED_GET_MESSAGE: 'ORDER_FEED_GET_MESSAGE' = 'ORDER_FEED_GET_MESSAGE';



export interface IOrderFeedConnectionStartAction {
  readonly type: typeof ORDER_FEED_CONNECTION_START;
  payload: string;
};

export interface IOrderFeedConnectionCloseAction {
  readonly type: typeof ORDER_FEED_CONNECTION_CLOSE;
};



export interface IOrderFeedConnectionSuccessAction {
  readonly type: typeof ORDER_FEED_CONNECTION_SUCCESS;
};

export interface IOrderFeedConnectionErrorAction {
  readonly type: typeof ORDER_FEED_CONNECTION_ERROR;
  payload: string;
};

export interface IOrderFeedConnectionClosedAction {
  readonly type: typeof ORDER_FEED_CONNECTION_CLOSED;
}

export interface IOrderFeedGetMessageAction {
  readonly type: typeof ORDER_FEED_GET_MESSAGE;
  payload: IOrderData;
};


export type TOrderFeedActions =
  IOrderFeedConnectionStartAction |
  IOrderFeedConnectionCloseAction |
  IOrderFeedConnectionSuccessAction |
  IOrderFeedConnectionErrorAction |
  IOrderFeedConnectionClosedAction |
  IOrderFeedGetMessageAction;

export type TwsOrderFeedActions = {
  wsInit: typeof ORDER_FEED_CONNECTION_START,
  wsClose: typeof ORDER_FEED_CONNECTION_CLOSE,
  onOpen: typeof ORDER_FEED_CONNECTION_SUCCESS,
  onClose: typeof ORDER_FEED_CONNECTION_CLOSED,
  onError: typeof ORDER_FEED_CONNECTION_ERROR,
  onMessage: typeof ORDER_FEED_GET_MESSAGE
}

export const orderFeedConnectionStart = (url: string): IOrderFeedConnectionStartAction => {
  console.log({url})
  return {
    type: ORDER_FEED_CONNECTION_START,
    payload: url,
  };
};

export const orderFeedConnectionClose = (): IOrderFeedConnectionCloseAction => {
  console.log('wsOrderFeedConnectionClose action')
  return {
    type: ORDER_FEED_CONNECTION_CLOSE
  }
}


// export const orderFeedConnectionSuccess = (): IOrderFeedConnectionSuccessAction => {
//   console.log('onOpen')
//   return {
//     type: ORDER_FEED_CONNECTION_SUCCESS
//   }
// }

// export const orderFeedConnectionError = (error: string): IOrderFeedConnectionErrorAction => {
//   return {
//     type: ORDER_FEED_CONNECTION_ERROR,
//     payload: error
//   }
// }

// export const orderFeedConnectionClosed = (): IOrderFeedConnectionClosedAction => {
//   console.log('wsOrderFeedConnectionClosED action')
//   return {
//     type: ORDER_FEED_CONNECTION_CLOSED
//   }
// }

// export const orderFeedGetMessage = (message: IOrderFeed): IOrderFeedGetMessageAction => {
//   return {
//     type: ORDER_FEED_GET_MESSAGE,
//     payload: message
//   }
// }


export const orderFeedActions = {
  wsInit: ORDER_FEED_CONNECTION_START,
  wsClose: ORDER_FEED_CONNECTION_CLOSE,
  onOpen: ORDER_FEED_CONNECTION_SUCCESS,
  onClose: ORDER_FEED_CONNECTION_CLOSED,
  onError: ORDER_FEED_CONNECTION_ERROR,
  onMessage: ORDER_FEED_GET_MESSAGE
}


