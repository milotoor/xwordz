import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { Main } from './app/main';

import '../vendor/material.light_blue-green.min.css';
import '../vendor/material.js';
import './index.styl';

ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);
