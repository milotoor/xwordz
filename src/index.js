import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './app/reducer';
import { Main } from './app/main';

import '../vendor/material.light_blue-green.min.css';
import '../vendor/material.js';
import './index.styl';

const store = createStore(reducer);
store.dispatch({
    type  : 'INIT_STATE',
    puzzle: require('../data/puzzles/sample4.json')
});

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>,
    document.getElementById('root')
);
