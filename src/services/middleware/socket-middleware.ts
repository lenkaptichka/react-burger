import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState, IOrderDataResponse } from '../../utils/types';
import {  TwsOrderFeedActions } from '../actions/order-feed';
import { TwsOrdersHistoryActions } from '../actions/orders-history';


export const socketMiddleware = (wsActions: TwsOrderFeedActions | TwsOrdersHistoryActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage, wsSendMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(payload);
      }
      if (socket) {

        socket.onopen = event => {
          dispatch({ type: onOpen });
        };

        socket.onerror = event => {
          dispatch(dispatch({ type: onError, payload: 'Ошибка webSocket' }));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: IOrderDataResponse = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose });
        };

        if (type === wsClose) {
          if (socket.readyState === 1) {
            socket.close();
            socket = null;
          }       
        }

        if (wsSendMessage && type === wsSendMessage) {
          const message = payload;
          socket?.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
