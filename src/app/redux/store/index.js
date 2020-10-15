import {
  applyMiddleware,
  createStore
} from 'redux';

import thunk from 'redux-thunk';

import {
  rootReducer
} from 'app/redux/reducers/index';

export const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;