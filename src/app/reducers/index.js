
import { Map, fromJS } from 'immutable';
import helpers from './helpers';

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


const initPuzzle = (state, puzzle) => {
    const newState = fromJS({
        puzzle,
        position: {
            row: 0,
            col: 0,
            dir: 'across'
        }
    });

    return newState.set('puzzle', helpers.initPuzzleClues(newState.get('puzzle')));
};


const moveCellDirection = (state, direction) => {
    // Given the current position, attempt to move the cell to the next available position in that
    // direction.
    const
        curRow = state.getIn(['position', 'row']),
        curCol = state.getIn(['position', 'col']);
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
            col: newCol
        }));
    }
};

export default function (state = new Map(), action) {
    switch (action.type) {
        case 'INIT_STATE':
            return initPuzzle(state, action.puzzle);
        case 'MOVE_CELL_DIRECTION':
            return moveCellDirection(state, action.dir);
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

export { helpers };
