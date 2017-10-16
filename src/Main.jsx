import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from './app/store';
import App from './app/App.jsx';
import { setState } from './app/reducers/actions';

import '../vendor/material.light_blue-green.min.css';
import '../vendor/material.js';
import './index.styl';

store.dispatch(setState(require('../data/puzzles/Bases Loaded.json')));
ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);
