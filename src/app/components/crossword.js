
import React, { Component } from 'react';
import { Board, ClueBar } from '.';

import './crossword.styl';


export default class Crossword extends Component {
    static propTypes = {
        board: React.PropTypes.object.isRequired
    }

    constructor () {
        super();
        this.state = {
            currentClue: {
                number   : 1,
                direction: 'across'
            }
        };
    }

    render () {
        return (
            <div id="crossword">
                <ClueBar currentClue={this.state.currentClue}/>
                <Board
                    board={this.props.board}
                    currentClue={this.state.currentClue}
                    updateClue={this.updateClue}
                />
            </div>
        );
    }

    updateClue = clue => this.setState({ currentClue: clue });
}
