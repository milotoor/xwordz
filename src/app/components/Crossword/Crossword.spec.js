
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import SimulateEvent from 'simulate-event';
import { fromJS } from 'immutable';
import { expect } from 'chai';

import { setState, changePosAttrs, enterCellContent } from '../../reducers/actions';
import reducer from '../../reducers';
import '../../../../test/test_helper';
import puzzleJSON from '../../../../test/data/puzzle.json';

import Crossword from './Crossword';


// Sample crossword
const puzzleData = fromJS(puzzleJSON);
const position = fromJS({
    row: 0,
    col: 0,
    dir: 'across'
});

// We will need to wrap the Crossword with a Provider because subsequent child nodes of the
// Crossword (i.e. the Grid) require a store.
const store = createStore(reducer);
const puzzle = (
    <Provider store={store}>
        <Crossword
            puzzle={puzzleData}
            position={position} />
    </Provider>
);


describe('Crossword', function () {
    before(() => {
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
    });

    after(() => {
        document.body.removeChild(this.container);
        delete this.container;
    });

    /**
     * Reset test state before each test
     */
    beforeEach(() => {
        ReactDOM.unmountComponentAtNode(this.container);
        store.dispatch(setState(puzzleJSON));
    });

    it('renders a ClueBar, Grid and ClueDirectory', () => {
        ReactDOM.render(puzzle, this.container);

        const
            grid          = this.container.querySelectorAll('#board'),
            clueDirectory = this.container.querySelectorAll('#clue-directory'),
            clueBar       = this.container.querySelectorAll('#clue-bar');

        expect(grid).to.have.length(1, 'No grid');
        expect(clueDirectory).to.have.length(1);
        expect(clueBar).to.have.length(1);
    });

    it('responds to arrow keys', () => {
        ReactDOM.render(puzzle, this.container);
        SimulateEvent.simulate(document.body, 'keydown', { key: 'ArrowRight' });

        // The position should move accordingly
        expect(store.getState().getIn(['position', 'col'])).to.equal(1);
    });

    it('responds to ASCII keys', () => {
        ReactDOM.render(puzzle, this.container);
        SimulateEvent.simulate(document.body, 'keydown', { key: 'a' });

        // The position should move, and additionally the progress should have been updated
        expect(store.getState().getIn(['position', 'col'])).to.equal(1);
        expect(store.getState().getIn(['progress', 0, 0])).to.equal('A');
    });

    it('responds to the backspace key', () => {
        ReactDOM.render(puzzle, this.container);

        const expectBackspaceEffect = (start, end) => {
            // Move to starting cell
            store.dispatch(changePosAttrs(start));

            // Enter some character
            store.dispatch(enterCellContent('A'));

            // Hit backspace
            SimulateEvent.simulate(document.body, 'keydown', { key: 'Backspace' });

            const
                state    = store.getState(),
                rowStart = start.row || state.getIn(['position', 'row']),
                colStart = start.end || state.getIn(['position', 'col']);

            // Assert changes
            expect(store.getState().getIn(['progress', rowStart, colStart])).to.be.null();
            Object.entries(end).forEach(([param, val]) => {
                expect(store.getState().getIn(['position', param])).to.equal(val);
            });
        };

        // Move to the first non-edge cell, maintaining the across direction. Backspace should
        // delete the current character and move back to the first cell
        expectBackspaceEffect({ col: 1 }, { col: 0 });

        // Same thing, but switch to down
        expectBackspaceEffect({ row: 1, direction: 'down' }, { row: 0 });
    });
});
