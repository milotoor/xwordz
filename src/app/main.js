
import React, { Component } from 'react';

import Crossword from './components';
import './main.styl';

export class Main extends Component {
    render () {
        return (
            <div id="main-wrapper">
                <main>
                    <Crossword />
                </main>
            </div>
        );
    }
}
