
import { Map, fromJS } from 'immutable';
import { assert, expect } from 'chai';

import '../../../test/test_helper';
import puzzleJSON from '../../../test/data/puzzle.json';
import * as actions from './actions';

import reducer, { Helpers as reducerHelpers } from '.';

describe.only('reducer', function () {
    // Set up an initial state that can be re-used by the tests
    before(() => {
        this.initialState = new Map({
            puzzle  : reducerHelpers.initPuzzle(puzzleJSON),
            progress: reducerHelpers.initProgress(puzzleJSON.grid),
            position: new Map({
                row: 0,
                col: 0,
                dir: 'across'
            })
        });
    });

    it('handles INIT_STATE', () => {
        const nextState = reducer(null, {
            type  : 'INIT_STATE',
            puzzle: puzzleJSON
        });

        // Todo: this isn't really testing anything... These are the same functions that are called
        // by the reducer, so we're essentially just testing that the reducer calls those functions
        // correctly. That's okay, but then we need to have tests for the helpers themselves, which
        // we do not at this time.
        expect(nextState).to.equal(this.initialState, 'INIT_STATE action does not update state correctly');
        assert.isOk(nextState.getIn(['puzzle', 'clues', 'across', 1]), 'Numeric clue does not exist');
        assert.isNotOk(nextState.getIn(['puzzle', 'clues', 'across', '1']), 'String clue exists');
    });

    it('handles MOVE_CELL_DIRECTION', () => {
        const actionDown  = actions.moveCellDown();
        const actionUp    = actions.moveCellUp();
        const actionLeft  = actions.moveCellLeft();
        const actionRight = actions.moveCellRight();
        const actionDumb  = {
            type: 'MOVE_CELL_DIRECTION',
            dir : 'DUMB'
        };

        // Moving down/right should work fine
        let nextState = reducer(this.initialState, actionDown);
        expect(nextState.get('position')).to.equal(fromJS({
            row: 1,
            col: 0,
            dir: 'across'
        }));

        nextState = reducer(this.initialState, actionRight);
        expect(nextState.get('position')).to.equal(fromJS({
            row: 0,
            col: 1,
            dir: 'across'
        }));

        // Moving up/left should not change the state (out of bounds)
        nextState = reducer(this.initialState, actionUp);
        expect(nextState.get('position')).to.equal(fromJS({
            row: 0,
            col: 0,
            dir: 'across'
        }));

        nextState = reducer(this.initialState, actionLeft);
        expect(nextState.get('position')).to.equal(fromJS({
            row: 0,
            col: 0,
            dir: 'across'
        }));

        // Providing a nonsense direction should not change the state
        nextState = reducer(this.initialState, actionDumb);
        expect(nextState.get('position')).to.equal(fromJS({
            row: 0,
            col: 0,
            dir: 'across'
        }));
    });

    it('handles MOVE_CELL_DIRECTION across blocks', () => {
        let initialState = this.initialState
            .setIn(['position', 'row'], 5)
            .setIn(['position', 'dir'], 'down');

        // Moving down should jump to row 9
        let nextState = reducer(initialState, actions.moveCellDown());
        expect(nextState.get('position')).to.equal(fromJS({
            row: 9,
            col: 0,
            dir: 'down'
        }));

        initialState = initialState.set('position', fromJS({
            row: 1,
            col: 11,
            dir: 'down'
        }));

        // Moving left should jump to col 8
        nextState = reducer(initialState, actions.moveCellLeft());
        expect(nextState.get('position')).to.equal(fromJS({
            row: 1,
            col: 8,
            dir: 'down'
        }));
    });

    it('handles CHANGE_CLUE by updating position and direction', () => {
        const action = {
            type: 'CHANGE_CLUE',
            clue: {
                number   : 9,
                direction: 'across'
            }
        };

        let nextState = reducer(this.initialState, action);
        expect(nextState.get('position')).to.equal(new Map({
            row: 0,
            col: 11,
            dir: 'across'
        }));

        action.clue = {
            number   : 28,
            direction: 'down'
        };

        nextState = reducer(nextState, action);
        expect(nextState.get('position')).to.equal(new Map({
            row: 5,
            col: 4,
            dir: 'down'
        }));

        // When given an unreal clue, nothing should change
        action.clue = {
            number   : 2,
            direction: 'across'
        };

        const newestState = reducer(nextState, action);
        expect(newestState).to.equal(nextState);
    });

    it('handles CHANGE_POS_ATTRS', () => {
        // It can handle when just a direction is provided
        const action = {
            type : 'CHANGE_POS_ATTRS',
            attrs: {
                direction: 'down'
            }
        };

        let nextState = reducer(this.initialState, action);
        expect(nextState.get('position')).to.equal(new Map({
            row: 0,
            col: 0,
            dir: 'down'
        }));

        // It can handle when a row and column are provided
        action.attrs = {
            row: 1,
            col: 2
        };

        nextState = reducer(nextState, action);
        expect(nextState.get('position')).to.equal(new Map({
            row: 1,
            col: 2,
            dir: 'down'
        }));
    });

    it('handles ENTER_CONTENT by updating the progress List', () => {
        const
            action = actions.enterCellContent('a'),
            nextState = reducer(this.initialState, action);

        // The position should move, and additionally the progress should have been updated
        expect(nextState.getIn(['progress', 0, 0])).to.equal('A');
    });

    it('handles VOTE by setting myVote', () => {
        const state = fromJS({
            vote: {
                round: 42,
                pair : ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            }
        });
        const action = { type: 'VOTE', entry: 'Trainspotting' };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                round: 42,
                pair : ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            },
            myVote: {
                round: 42,
                entry: 'Trainspotting'
            }
        }));
    });

    it('does not set myVote for VOTE on invalid entry', () => {
        const state = fromJS({
            vote: {
                round: 42,
                pair : ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            }
        });
        const action = { type: 'VOTE', entry: 'Sunshine' };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                round: 42,
                pair : ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            }
        }));
    });

    it('removes myVote on SET_STATE if round has changed', () => {
        const initialState = fromJS({
            vote: {
                round: 42,
                pair : ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            },
            myVote: {
                round: 42,
                entry: 'Trainspotting'
            }
        });
        const action = {
            type : 'SET_STATE',
            state: {
                vote: {
                    round: 43,
                    pair : ['Sunshine', 'Trainspotting']
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                round: 43,
                pair : ['Sunshine', 'Trainspotting']
            }
        }));
    });
});
