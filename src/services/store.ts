import { rootReducer } from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { socketMiddleware } from './middlaware/socketMiddleware';

const composeEnhancers =
  typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
