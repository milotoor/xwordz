
// Libs
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

// App resources
import reducer from './reducers';


// Use Redux's compose if user doesn't have Redux Devtools installed
// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);
