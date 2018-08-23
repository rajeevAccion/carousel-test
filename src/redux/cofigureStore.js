import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';

import api from 'redux/middleware/api';
import rootReducer from './reducers';

export const middlewares = [api];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  return store;
};

export default configureStore;
