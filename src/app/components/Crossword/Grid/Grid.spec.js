
import React from 'react';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-addons-test-utils';

import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import '../../../../../test/test_helper';
import initProgress from '../../../reducers/helpers/initProgress';

import { Grid } from './Grid';


// Sample 2x2 crossword
const gridData = fromJS([
    [
        { clueNumber: 1, containingClues: { down: 1, across: 1 }, solution: 'I' },
        { clueNumber: 2, containingClues: { down: 2, across: 1 }, solution: 'T' }
    ],
    [
        { isBlockCell: true },
        { clueNumber: 3, containingClues: { down: 2, across: 3 }, solution: 'A' }
    ]
]);

const puzzle = new Map({ grid: gridData });
const progress = initProgress(puzzle);
const position = fromJS({
    row: 0,
    col: 0,
    dir: 'across'
});

const grid = (
    <Grid
        puzzle={puzzle}
        position={position}
        progress={progress}
        changePosAttrs={() => {}} />
);

describe('Grid', () => {
    it('renders all of the cells', () => {
        const
            component = renderIntoDocument(grid),
            renderedRows = scryRenderedDOMComponentsWithClass(component, 'board-row'),
            renderedCells = scryRenderedDOMComponentsWithClass(component, 'cell-content');

        expect(renderedRows.length).to.equal(2);
        expect(renderedCells.length).to.equal(4);
    });

    it('responds to clicks', () => {
        let pos;
        const _grid = (
            <Grid
                puzzle={puzzle}
                position={position}
                progress={progress}
                changePosAttrs={attrs => pos = attrs} />
        );

        const
            component = renderIntoDocument(_grid),
            renderedCells = scryRenderedDOMComponentsWithClass(component, 'cell-content');

        // Clicking the first cell when it is already the current cell should change the direction
        Simulate.click(renderedCells[0]);
        expect(pos).to.eql({ direction: 'down' });

        // Clicking the second cell should change the position but not the direction
        Simulate.click(renderedCells[1]);
        expect(pos).to.eql({ row: 0, col: 1 });

        // Clicking the third cell shouldn't change anything because it's a block cell
        pos = null;
        Simulate.click(renderedCells[2]);
        expect(pos).to.be.null();
    });
});
