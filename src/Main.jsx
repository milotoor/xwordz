import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './app/store';
import App from './app/App';
import { setState } from './app/reducers/actions';

import './index.styl';
import './index.scss';

store.dispatch(setState(require('../data/puzzles/Bases Loaded.json')));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
