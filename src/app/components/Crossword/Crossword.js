
import React, { Component, PropTypes } from 'react';
import { Board, ClueBar, ClueDirectory } from '.';

import './Crossword.styl';


export default class Crossword extends Component {
    static propTypes = {
        board: PropTypes.object.isRequired
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
                <div ref={c => this.boardWrapper = c} id="clue-bar-board-wrapper">
                    <ClueBar
                        currentClue={this.state.currentClue}
                        board={this.props.board}
                    />

                    <Board
                        board={this.props.board}
                        currentClue={this.state.currentClue}
                        updateClue={this.updateClue}
                    />
                </div>

                <ClueDirectory
                    currentClue={this.state.currentClue}
                    board={this.props.board}
                />
            </div>
        );
    }

    updateClue = clue => this.setState({ currentClue: clue });
}
