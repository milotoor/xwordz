
import * as events from '../../reducers/events';
import { ARROW_DIRECTIONS, CLUE_DIRECTIONS } from '../../constants';

/**
 * Returns `true` if the `key` param indicates that the key that was pressed was an arrow key
 */
const isArrowPress = key => (
    [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown'
    ].includes(key)
);

/**
 * Returns `true` if the `key` param indicates that the key that was pressed was an alphabetic
 * (i.e. a-zA-Z) key
 */
const isAlphaPress = key => (
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').includes(key)
);

/**
 * Returns `true` if the `key` param is the string "Backspace"
 */
const isBackspace = key => key === 'Backspace';


const moveCell = direction => ({
    type: events.MOVE_DIRECTION,
    direction
});


/**
 * Called when an arrow button is pressed. This will either move the cell in a direction, toggle
 * the current direction, or jump the cell to the next clue in a given direction
 */
const handleArrowPress = (key, dispatch, getState) => {
    const
        direction = getState().getIn(['position', 'dir']),
        isAcross  = direction === CLUE_DIRECTIONS.across,
        isDown    = direction === CLUE_DIRECTIONS.down;

    const toggleDirection = { type: events.TOGGLE_DIRECTION };

    switch (key) {
        case 'ArrowLeft':
            return dispatch(isAcross ? moveCell(ARROW_DIRECTIONS.left)  : toggleDirection);
        case 'ArrowRight':
            return dispatch(isAcross ? moveCell(ARROW_DIRECTIONS.right) : toggleDirection);
        case 'ArrowUp':
            return dispatch(isDown   ? moveCell(ARROW_DIRECTIONS.up)    : toggleDirection);
        case 'ArrowDown':
            return dispatch(isDown   ? moveCell(ARROW_DIRECTIONS.down)  : toggleDirection);
        default:
            return;
    }
};


const handleAlphaPress = (key, dispatch, getState) => {
    const direction = getState().getIn(['position', 'dir']);

    // Emit event to change current progress
    dispatch({
        type   : events.ENTER_CELL_CONTENT,
        content: key.toUpperCase()
    });

    // Should be refactored into a method that will move to the next unanswered square in the
    // current clue
    if (direction === CLUE_DIRECTIONS.across) {
        dispatch(moveCell(ARROW_DIRECTIONS.right));
    } else {
        dispatch(moveCell(ARROW_DIRECTIONS.down));
    }
};


/**
 * Handles the instance when the user presses the backspace key. We will delete the content of
 * the current cell and move them one cell backward in the direction they are facing. This may
 * mean moving to the end of the previous clue
 */
const handleBackspace = (dispatch, getState) => {
    const state = getState();
    const position = state.get('position').toJS();

    const deleteContent = () => dispatch({ type: events.DELETE_CELL_CONTENT });

    // Move to the previous cell
    const reposition = () => {
        if (position.dir === CLUE_DIRECTIONS.across) {
            dispatch(moveCell(ARROW_DIRECTIONS.left));
        } else {
            dispatch(moveCell(ARROW_DIRECTIONS.up));
        }
    };

    // Check if the current cell is empty. If it is, we will move first, then delete. Otherwise
    // if there is a character we will delete and then move
    const currentCellContent = state.getIn(['progress', position.row, position.col]);
    if (currentCellContent === null) {
        reposition();
        deleteContent();
    } else {
        deleteContent();
        reposition();
    }
};

/* eslint-disable import/prefer-default-export */
export const handleKeyPress = key => (dispatch, getState) => {
    if (isArrowPress(key)) {
        handleArrowPress(key, dispatch, getState);
    } else if (isAlphaPress(key)) {
        handleAlphaPress(key, dispatch, getState);
    } else if (isBackspace(key)) {
        handleBackspace(dispatch, getState);
    }
};
