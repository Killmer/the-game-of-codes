import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import middleware from '../battlefield/middleware';

import rootReducer from "../battlefield/reducers";

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
