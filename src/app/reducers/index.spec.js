
import { Map, fromJS } from 'immutable';
import { assert, expect } from 'chai';

import '../../../test/test_helper';
import puzzleJSON from '../../../test/data/puzzle.json';

import reducer, { helpers as reducerHelpers } from '.';

describe('reducer', () => {
    it('handles INIT_STATE', () => {
        const nextState = reducer(null, {
            type  : 'INIT_STATE',
            puzzle: puzzleJSON
        });

        const mapState = fromJS({
            puzzle  : puzzleJSON,
            position: {
                row: 0,
                col: 0,
                dir: 'across'
            }
        });

        // Transform the puzzle's clue keys to be numeric
        const expectedState = mapState.set(
            'puzzle',
            reducerHelpers.initPuzzleClues(mapState.get('puzzle'))
        );

        expect(nextState).to.equal(expectedState, 'INIT_STATE action does not update state correctly');
        assert.isOk(nextState.getIn(['puzzle', 'clues', 'across', 1]), 'Numeric clue does not exist');
        assert.isNotOk(nextState.getIn(['puzzle', 'clues', 'across', '1']), 'String clue exists');
    });

    it('handles MOVE_CELL_DIRECTION', () => {
        const initialState = fromJS({
            puzzle  : puzzleJSON,
            position: {
                row: 0,
                col: 0
            }
        });

        const makeAction = dir => ({
            type: 'MOVE_CELL_DIRECTION',
            dir
        });

        const actionDown  = makeAction('DOWN');
        const actionUp    = makeAction('UP');
        const actionLeft  = makeAction('LEFT');
        const actionRight = makeAction('RIGHT');
        const actionDumb  = makeAction('DUMB');

        // Moving down/right should work fine
        let nextState = reducer(initialState, actionDown);
        expect(nextState.get('position')).to.equal(fromJS({
            row: 1,
            col: 0
        }));

        nextState = reducer(initialState, actionRight);
        expect(nextState.get('position')).to.equal(fromJS({
            row: 0,
            col: 1
        }));

        // Moving up/left should not change the state (out of bounds)
        nextState = reducer(initialState, actionUp);
        expect(nextState.get('position')).to.equal(fromJS({
            row: 0,
            col: 0
        }));

        nextState = reducer(initialState, actionLeft);
        expect(nextState.get('position')).to.equal(fromJS({
            row: 0,
            col: 0
        }));

        // Providing a nonsense direction should not change the state
        nextState = reducer(initialState, actionDumb);
        expect(nextState.get('position')).to.equal(fromJS({
            row: 0,
            col: 0
        }));
    });

    it('handles MOVE_CELL_DIRECTION across blocks', () => {
        let initialState = fromJS({
            puzzle  : puzzleJSON,
            position: {
                row: 5,
                col: 0
            }
        });

        let action = {
            type: 'MOVE_CELL_DIRECTION',
            dir : 'DOWN'
        };

        // Moving down should jump to row 9
        let nextState = reducer(initialState, action);
        expect(nextState.get('position')).to.equal(fromJS({
            row: 9,
            col: 0
        }));

        initialState = initialState.set('position', fromJS({
            row: 1,
            col: 11
        }));

        action = {
            type: 'MOVE_CELL_DIRECTION',
            dir : 'LEFT'
        };

        // Moving left should jump to col 8
        nextState = reducer(initialState, action);
        expect(nextState.get('position')).to.equal(fromJS({
            row: 1,
            col: 8
        }));
    });

    it('handles CHANGE_CLUE by updating position and direction', () => {
        const initialState = fromJS({
            puzzle  : puzzleJSON,
            position: {
                row: 0,
                col: 0,
                dir: 'across'
            }
        });

        const action = {
            type: 'CHANGE_CLUE',
            clue: {
                number   : 9,
                direction: 'across'
            }
        };

        let nextState = reducer(initialState, action);
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
