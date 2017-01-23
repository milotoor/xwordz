
import { Map } from 'immutable';
import _isUndefined from 'lodash/isUndefined';
import _isString from 'lodash/isString';

import * as Helpers from './helpers';


function setConnectionState (state, connectionState, connected) {
    return state.set('connection', new Map({
        state: connectionState,
        connected
    }));
}

function setState (state, newState) {
    return state.merge(newState);
}

function vote (state, entry) {
    const currentRound = state.getIn(['vote', 'round']);
    const currentPair = state.getIn(['vote', 'pair']);
    if (currentPair && currentPair.includes(entry)) {
        return state.set('myVote', new Map({
            round: currentRound,
            entry
        }));
    }
    return state;
}

function resetVote (state) {
    const votedForRound = state.getIn(['myVote', 'round']);
    const currentRound = state.getIn(['vote', 'round']);
    return votedForRound === currentRound
        ? state
        : state.remove('myVote');
}


const initPuzzle = (state, puzzle, progress) => {
    return new Map({
        puzzle  : Helpers.initPuzzle(puzzle),
        progress: Helpers.initProgress(puzzle.grid, progress),
        position: new Map({
            row: 0,
            col: 0,
            dir: 'across'
        })
    });
};


const moveCellDirection = (state, direction) => {
    // Given the current position, attempt to move the cell to the next available position in that
    // direction.
    const
        position = state.get('position'),
        curRow   = position.get('row'),
        curCol   = position.get('col');

    let newRow = curRow,
        newCol = curCol,
        op;

    switch (direction) {
        case 'UP':
            op = () => newRow -= 1;
            break;
        case 'DOWN':
            op = () => newRow += 1;
            break;
        case 'LEFT':
            op = () => newCol -= 1;
            break;
        case 'RIGHT':
            op = () => newCol += 1;
            break;
        default:
            // Invalid directions will not change state
            return state;
    }

    // Make the move
    op();

    const
        grid    = state.getIn(['puzzle', 'grid']),
        numRows = grid.size,
        numCols = grid.get(0).size;

    // Attempt to access new position. If it is out of bounds, the move is disallowed. If the cell
    // is a block, attempt to continue moving in the provided direction until a non-block is reached
    while (true) {
        // Check boundary condition
        if (newCol < 0 || newRow < 0 || newCol >= numCols || newRow >= numRows) {
            return state;
        }

        // If it's a block, keep moving
        if (grid.getIn([newRow, newCol, 'isBlockCell'])) {
            op();
            continue;
        }

        // Valid move, update the state
        return state.set('position', new Map({
            row: newRow,
            col: newCol,
            dir: position.get('dir')
        }));
    }
};


/**
 * Update the current position given the number and direction of a new clue
 */
const changeClue = (state, clue) => {
    // Iterate across the grid until we find the clue.
    // TODO: This should happen with grid initialization.
    const grid = state.getIn(['puzzle', 'grid']);
    for (const row of grid) {
        for (const cell of row) {
            if (!cell.has('containingClues')) {
                continue;
            }

            if (cell.getIn(['containingClues', clue.direction]) === clue.number) {
                return state.set('position', new Map({
                    row: grid.indexOf(row),
                    col: row.indexOf(cell),
                    dir: clue.direction
                }));
            }
        }
    }

    // Couldn't find the starting cell... return state unchanged.
    return state;
};


const changePosition = (state, { row, col, direction }) => {
    const position = state.get('position').withMutations((pos) => {
        if (!_isUndefined(row)) {
            pos.set('row', row);
        }

        if (!_isUndefined(col)) {
            pos.set('col', col);
        }

        if (!_isUndefined(direction)) {
            pos.set('dir', direction);
        }
    });

    return state.set('position', position);
};


const enterCellContent = (state, content) => {
    // Validate content
    if (!_isString(content)) {
        return state;
    }

    const
        row = state.getIn(['position', 'row']),
        col = state.getIn(['position', 'col']);

    return state.setIn(['progress', row, col], content.toUpperCase());
};


const deleteCellContent = (state) => {
    const
        row = state.getIn(['position', 'row']),
        col = state.getIn(['position', 'col']);

    return state.setIn(['progress', row, col], null);
};


export default function (state = new Map(), action) {
    switch (action.type) {
        case 'INIT_STATE':
            return initPuzzle(state, action.puzzle, action.progress);
        case 'MOVE_CELL_DIRECTION':
            return moveCellDirection(state, action.dir);
        case 'CHANGE_CLUE':
            return changeClue(state, action.clue);
        case 'CHANGE_POS_ATTRS':
            return changePosition(state, action.attrs);
        case 'ENTER_CELL_CONTENT':
            return enterCellContent(state, action.content);
        case 'DELETE_CELL_CONTENT':
            return deleteCellContent(state);

        // Leftovers from setup app
        case 'SET_CONNECTION_STATE':
            return setConnectionState(state, action.state, action.connected);
        case 'SET_STATE':
            return resetVote(setState(state, action.state));
        case 'VOTE':
            return vote(state, action.entry);
        default:
            return state;
    }
}

export { Helpers };
