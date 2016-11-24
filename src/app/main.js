
import React, { Component } from 'react';

import Crossword from './components';
import sampleData from '../../data/puzzles/sample3.json';
import './main.styl';

export class Main extends Component {
    render () {
        return (
            <div id="main-wrapper">
                <main>
                    <Crossword board={sampleData}/>
                </main>
            </div>
        );
    }
}
