import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './app/reducers';
import { Main } from './app/main';
import { setState } from './app/reducers/actions';

import '../vendor/material.light_blue-green.min.css';
import '../vendor/material.js';
import './index.styl';

const store = createStore(reducer);
store.dispatch(setState(require('../data/puzzles/sample4.json')));

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);
