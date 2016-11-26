
import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import './test_helper';
import puzzleJSON from './data/puzzel.json';

import reducer from '../src/app/reducer';

describe('reducer', () => {
    it('handles MOVE_CELL_DIRECTION', () => {
        const initialState = fromJS({
            puzzle: puzzleJSON,
            position: {
                row: 0,
                col: 0
            }
        });

        const action = {
            type: 'MOVE_CELL_DIRECTION',
            dir : 'DOWN'
        };

        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            puzzle: puzzleJSON,
            position: {
                row: 1,
                col: 0
            }
        }));
    });

    it('handles SET_STATE', () => {
        const initialState = new Map();
        const action = {
            type : 'SET_STATE',
            state: new Map({
                vote: new Map({
                    pair : List.of('Trainspotting', '28 Days Later'),
                    tally: new Map({ Trainspotting: 1 })
                })
            })
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair : ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            }
        }));
    });

    it('handles SET_STATE with plain JS payload', () => {
        const initialState = new Map();
        const action = {
            type : 'SET_STATE',
            state: {
                vote: {
                    pair : ['Trainspotting', '28 Days Later'],
                    tally: { Trainspotting: 1 }
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair : ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            }
        }));
    });

    it('handles SET_STATE without initial state', () => {
        const action = {
            type : 'SET_STATE',
            state: {
                vote: {
                    pair : ['Trainspotting', '28 Days Later'],
                    tally: { Trainspotting: 1 }
                }
            }
        };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair : ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            }
        }));
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
