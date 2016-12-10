
import React from 'react';
import { render } from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-addons-test-utils';

import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import Colors from '../../../../util/colors';
import Cell from './Cell';


describe('Cell', () => {
    it('renders a clue number when provided', () => {
        const container = document.createElement('div');
        const cellProps = {
            data         : new Map(),
            coords       : {},
            onCellClick  : () => {},
            isCurrentCell: false
        };

        let component = render(<Cell {...cellProps} />, container),
            clueNumber = scryRenderedDOMComponentsWithClass(component, 'clue-number');
        expect(clueNumber.length).to.equal(0, 'Clue number rendered when it should not');

        // Give the props a clue number
        cellProps.data = cellProps.data.set('clueNumber', 1);
        component = render(<Cell {...cellProps} />, container);
        clueNumber = scryRenderedDOMComponentsWithClass(component, 'clue-number');
        expect(clueNumber.length).to.equal(1, 'Clue number did not render when it should have');
        expect(clueNumber[0].textContent).to.equal('1', 'Clue number rendered wrong number');
    });

    it('renders correct classes when it is the current cell', () => {
        const container = document.createElement('div');
        const cellProps = {
            data         : new Map(),
            coords       : {},
            onCellClick  : () => {},
            isCurrentCell: false
        };

        let component = render(<Cell {...cellProps} />, container),
            selectedCells = scryRenderedDOMComponentsWithClass(component, Colors.primary500);
        expect(selectedCells.length).to.equal(0, 'Cell has cell-selected color when it should not');

        // Make the cell the current cell
        cellProps.isCurrentCell = true;
        component = render(<Cell {...cellProps} />, container);
        selectedCells = scryRenderedDOMComponentsWithClass(component, Colors.primary500);
        expect(selectedCells.length).to.equal(1, 'Cell does not have cell-selected color when it should');
    });

    it('renders correct classes when it is a block cell', () => {
        const container = document.createElement('div');
        const cellProps = {
            data         : new Map(),
            coords       : {},
            onCellClick  : () => {},
            isCurrentCell: false
        };

        let component = render(<Cell {...cellProps} />, container),
            blockCells = scryRenderedDOMComponentsWithClass(component, 'block');
        expect(blockCells.length).to.equal(0, 'Cell rendered as block when it should not');

        // Make the cell a block cell
        cellProps.data = cellProps.data.set('isBlockCell', true);
        component = render(<Cell {...cellProps} />, container);
        blockCells = scryRenderedDOMComponentsWithClass(component, 'block');
        expect(blockCells.length).to.equal(1, 'Cell not rendered as block when it should');
    });

    it('renders correct classes when it is part of current clue', () => {
        const container = document.createElement('div');
        const cellProps = {
            data: fromJS({
                containingClues: {
                    across: 5,
                    down  : 1
                }
            }),
            coords       : {},
            onCellClick  : () => {},
            isCurrentCell: false,
            currentClue  : {
                number   : 1,
                direction: 'across'
            }
        };

        let component = render(<Cell {...cellProps} />, container),
            highlightedCells = scryRenderedDOMComponentsWithClass(component, Colors.primary100);
        expect(highlightedCells.length).to.equal(0, 'Cell rendered as part of current clue');

        // Change the cell's containing clues
        cellProps.data = cellProps.data.setIn(['containingClues', 'across'], 1);
        component = render(<Cell {...cellProps} />, container);
        highlightedCells = scryRenderedDOMComponentsWithClass(component, Colors.primary100);
        expect(highlightedCells.length).to.equal(1, 'Cell not rendered as part of current clue');

        // Now make the cell the current cell
        cellProps.isCurrentCell = true;
        component = render(<Cell {...cellProps} />, container);
        highlightedCells = scryRenderedDOMComponentsWithClass(component, Colors.primary100);
        expect(highlightedCells.length).to.equal(0, 'Cell rendered as part of current clue when it is selected');

        highlightedCells = scryRenderedDOMComponentsWithClass(component, Colors.primary500);
        expect(highlightedCells.length).to.equal(1, 'Cell not rendered as current cell');
    });

    it('renders responds to clicks', () => {
        let clickedData = null;

        const cellProps = {
            data         : new Map(),
            coords       : {},
            onCellClick  : data => clickedData = data,
            isCurrentCell: false
        };

        const
            component = renderIntoDocument(<Cell {...cellProps} />),
            cell = scryRenderedDOMComponentsWithClass(component, 'cell-content');

        Simulate.click(cell[0]);
        expect(clickedData).to.equal(cellProps.data, 'Clicking cell did not trigger callback');
    });
});
