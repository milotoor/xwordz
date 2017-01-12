
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
        const { puzzle, progress, position } = this.props;
        const currentClue = Helpers.currentClue(puzzle, position);

        return (
            <div id="crossword">
                <div id="clue-bar-board-wrapper">
                    <ClueBar currentClue={currentClue} />

                    <Grid
                        puzzle={puzzle}
                        progress={progress}
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
        const key = event.key;

        if (Crossword._isArrowPress(key)) {
            return this.handleArrowPress(event);
        }

        if (Crossword._isAlphaPress(key)) {
            return this.handleAlphaPress(key);
        }
    }

    static _cellDirections = {
        up   : 0,
        left : 1,
        right: 2,
        down : 3
    };

    /**
     * Dispatches an action to move the current cell a given direction. The `direction` atttribute
     * should match one of the values of the `_cellDirections` object
     *
     * @param {integer} direction
     *   An integer representation of the direction to move the cell in. Consult the
     *   `_cellDirections` object.
     */
    moveCell (direction) {
        switch (direction) {
            case Crossword._cellDirections.up:
                return this.props.moveCellUp();
            case Crossword._cellDirections.left:
                return this.props.moveCellLeft();
            case Crossword._cellDirections.right:
                return this.props.moveCellRight();
            case Crossword._cellDirections.down:
                return this.props.moveCellDown();
            default:
                return;
        }
    }

    /**
     * Called when an arrow button is pressed. This will either move the cell in a direction, toggle
     * the current direction, or jump the cell to the next clue in a given direction
     */
    handleArrowPress ({ key /* , shiftKey */ }) {
        const
            { position, changePosAttrs } = this.props,
            direction = position.get('dir'),
            isAcross  = direction === 'across',
            isDown    = direction === 'down';

        const
            toggleDirection = () => changePosAttrs({ direction: isAcross ? 'down' : 'across' }),
            directions      = Crossword._cellDirections;

        switch (key) {
            case 'ArrowLeft':
                return isAcross ? this.moveCell(directions.left)  : toggleDirection();
            case 'ArrowRight':
                return isAcross ? this.moveCell(directions.right) : toggleDirection();
            case 'ArrowUp':
                return isDown   ? this.moveCell(directions.up)    : toggleDirection();
            case 'ArrowDown':
                return isDown   ? this.moveCell(directions.down)  : toggleDirection();
            default:
                return;
        }
    }

    handleAlphaPress (key) {
        const
            { position } = this.props,
            direction = position.get('dir');

        // Emit event to change current progress
        this.props.enterCellContent(key.toUpperCase());

        // Should be refactored into a method that will move to the next unanswered square in the
        // current clue
        if (direction === 'across') {
            this.moveCell(Crossword._cellDirections.right);
        } else {
            this.moveCell(Crossword._cellDirections.down);
        }
    }

    /**
     * Part of our keypress identification system. Returns `true` if the `key` param indicates that
     * the key that was pressed was an arrow key
     *
     * @param {string} key
     *   The DOM event's string representation of the key pressed
     *
     * @returns {boolean}
     */
    static _isArrowPress (key) {
        return [
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown'
        ].includes(key);
    }

    /**
     * Part of our keypress identification system. Returns `true` if the `key` param indicates that
     * the key that was pressed was an alphabetic (i.e. a-zA-Z) key
     *
     * @param {string} key
     *   The DOM event's string representation of the key pressed
     *
     * @returns {boolean}
     */
    static _isAlphaPress (key) {
        return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').includes(key);
    }
}

function mapStateToProps (state) {
    return {
        puzzle  : state.get('puzzle'),
        progress: state.get('progress'),
        position: state.get('position')
    };
}

export default connect(mapStateToProps, actions)(Crossword);
