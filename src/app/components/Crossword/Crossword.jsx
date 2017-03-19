
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { handleKeyPress } from './actions';
import { Grid, ClueBar, ClueDirectory } from '.';
import './Crossword.styl';


export class Crossword extends PureComponent {
    render () {
        return (
            <div id="crossword">
                <div id="clue-bar-board-wrapper">
                    <ClueBar />
                    <Grid />
                </div>

                <ClueDirectory />
            </div>
        );
    }

    componentDidMount () {
        document.body.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount () {
        document.body.removeEventListener('keydown', this.handleKeyDown);
    }

    /**
     * Handles global keydown events. If we ever want to have another input element on the page
     * (and I'm sure we will) something will need to be done about this and the body event listeners
     * in `componentDidMount` and `componentWillUnmount` to make the listening targeted specifically
     * to when the user is inputting letters on the board. That's a design decision that I'm putting
     * off for now.
     */
    handleKeyDown = (event) => {
        this.props.handleKeyPress(event.key);
        event.stopPropagation();
    }
}


export default connect(null, { handleKeyPress })(Crossword);
