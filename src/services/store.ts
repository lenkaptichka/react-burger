import { rootReducer } from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { orderFeedActions } from './actions/order-feed';
import { socketMiddleware } from './middleware/socket-middleware';
import { OrdersHistoryActions } from './actions/orders-history';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(
  thunk,
  socketMiddleware(orderFeedActions),
  socketMiddleware(OrdersHistoryActions)
));

export const store = createStore(rootReducer, enhancer);
