
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import Helpers from '../../helpers';
import * as actions from '../../reducers/actions';
import { Grid, ClueBar, ClueDirectory } from '.';
import './Crossword.styl';


export class Crossword extends PureComponent {
    static propTypes = {
        puzzle  : PropTypes.object.isRequired,
        position: PropTypes.object.isRequired
    }

    render () {
        const { puzzle, position } = this.props;
        const currentClue = Helpers.currentClue(puzzle, position);

        return (
            <div id="crossword">
                <div id="clue-bar-board-wrapper">
                    <ClueBar currentClue={currentClue} />

                    <Grid
                        puzzle={puzzle}
                        position={position} />
                </div>

                <ClueDirectory
                    clues={puzzle.get('clues')}
                    currentClue={currentClue} />
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
        switch (event.which) {
            case 37:
            case 38:
            case 39:
            case 40:
                return this.moveCellDirection(event.which);
            default:
                return;
        }
    }

    moveCellDirection (keyCode) {
        switch (keyCode) {
            case 37:
                return this.props.moveCellLeft();
            case 38:
                return this.props.moveCellUp();
            case 39:
                return this.props.moveCellRight();
            case 40:
                return this.props.moveCellDown();
            default:
                return;
        }
    }
}

function mapStateToProps (state) {
    return {
        puzzle  : state.get('puzzle'),
        position: state.get('position')
    };
}

export default connect(mapStateToProps, actions)(Crossword);
