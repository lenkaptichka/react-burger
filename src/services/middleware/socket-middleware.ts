import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState, IOrderData } from '../../utils/types';
import {  TwsOrderFeedActions } from '../actions/order-feed';
import { TwsOrdersHistoryActions } from '../actions/orders-history';


export const socketMiddleware = (wsActions: TwsOrderFeedActions | TwsOrdersHistoryActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      // console.log({action})
      const { type, payload } = action;
      // const type = action.type;
      // const payload = action.payload;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions;


      if (type === wsInit) {
        socket = new WebSocket(payload);
      }
      if (socket) {

        socket.onopen = event => {
          dispatch({ type: onOpen });
        };

        socket.onerror = event => {
          dispatch(dispatch({ type: onError, payload: 'Ошибка' }));
        };

        socket.onmessage = event => {
          const { data } = event;
          // TODO Переделать
          const parsedData: IOrderData & {success: boolean} = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          // dispatch(onMessage(restParsedData));
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          // dispatch(onClose());
          dispatch({ type: onClose });

          // socket?.close();
          // socket = null;
        };

        if (type === wsClose) {
          socket.close();
        }

        // if (type === wsSendMessage) {


        //   const message = { ...payload, token: user.token };
        //   socket.send(JSON.stringify(message));
        // }
      }

      next(action);
    };
  };
};

// export const socketMiddleware = (wsActions): Middleware => {
//     return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
//         let socket: WebSocket | null = null;

//     return next => (action: TApplicationActions) => {
//       const { dispatch, getState } = store;
//       const { type, payload } = action;

//       const {
//         wsInit, onOpen, onClose, onError, onMessage, wsClose
//       } = wsActions;
 
//       if (type === wsInit) {
//             // объект класса WebSocket
//             console.log({payload})
//         socket = new WebSocket(payload);

//         socket.onclose = event => {
//           console.log('закрытие сокета')
//         }


//         // socket.onclose = (event) => {
//         //   console.log('закрытие сокета');
//         //   socket!.close();
//         //   socket = null;
//         //   dispatch({ type: onClose, payload: event });
//         // };

//       }

//       if (socket) {

//                 // функция, которая вызывается при открытии сокета
//         socket.onopen = event => {
//           console.log('Открытие сокета')
//           dispatch({ type: onOpen, payload: event });
//         };

//                 // функция, которая вызывается при ошибке соединения
//         socket.onerror = event => {
//           dispatch({ type: onError, payload: event });
//         };

//                 // функция, которая вызывается при получения события от сервера
//         socket.onmessage = event => {
//           const { data } = event;
//           const parsedData = JSON.parse(data);
//           const { success, ...restParsedData } = parsedData;
//           console.log({parsedData})
//           dispatch({ type: onMessage, payload: restParsedData });
//         };
//                 // функция, которая вызывается при закрытии соединения
//           // socket.onclose = (event) => {
//           //   console.log('закрытие сокета');
//           //   socket!.close();
//           //   socket = null;
//           //   dispatch({ type: onClose, payload: event });
//           // };

//           socket.onclose = event => {
//             console.log('закрытие сокета');
//             dispatch({ type: onClose, payload: event })
//           }

//         // if (type === 'WS_SEND_MESSAGE') {
//         //   const message = payload;
//         //             // функция для отправки сообщения на сервер
//         //   socket.send(JSON.stringify(message));
//         // }
//       }

//       next(action);
//     };
//     }) as Middleware;
// }; 