
import React from 'react';
import { render } from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils';

import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import _extend from 'lodash/extend';

import Colors from '../../../../util/colors';
import Cell from './Cell';


describe('Cell', function () {
    beforeEach(() => {
        this.cellProps = {
            data         : new Map(),
            coords       : {},
            onCellClick  : () => {},
            isCurrentCell: false
        };

        this.container = document.createElement('div');
    });

    it('renders a clue number when provided', () => {
        const cellProps = this.cellProps;

        let component = render(<Cell {...cellProps} />, this.container),
            clueNumber = scryRenderedDOMComponentsWithClass(component, 'clue-number');
        expect(clueNumber.length).to.equal(0, 'Clue number rendered when it should not');

        // Give the props a clue number
        cellProps.data = cellProps.data.set('clueNumber', 1);
        component = render(<Cell {...cellProps} />, this.container);
        clueNumber = scryRenderedDOMComponentsWithClass(component, 'clue-number');
        expect(clueNumber.length).to.equal(1, 'Clue number did not render when it should have');
        expect(clueNumber[0].textContent).to.equal('1', 'Clue number rendered wrong number');
    });

    it('renders correct classes when it is the current cell', () => {
        const cellProps = this.cellProps;

        let component = render(<Cell {...cellProps} />, this.container),
            selectedCells = scryRenderedDOMComponentsWithClass(component, Colors.primary500);
        expect(selectedCells.length).to.equal(0, 'Cell has cell-selected color when it should not');

        // Make the cell the current cell
        cellProps.isCurrentCell = true;
        component = render(<Cell {...cellProps} />, this.container);
        selectedCells = scryRenderedDOMComponentsWithClass(component, Colors.primary500);
        expect(selectedCells.length).to.equal(1, 'Cell does not have cell-selected color when it should');
    });

    it('renders correct classes when it is a block cell', () => {
        const cellProps = this.cellProps;

        let component = render(<Cell {...cellProps} />, this.container),
            blockCells = scryRenderedDOMComponentsWithClass(component, 'block');
        expect(blockCells.length).to.equal(0, 'Cell rendered as block when it should not');

        // Make the cell a block cell
        cellProps.data = cellProps.data.set('isBlockCell', true);
        component = render(<Cell {...cellProps} />, this.container);
        blockCells = scryRenderedDOMComponentsWithClass(component, 'block');
        expect(blockCells.length).to.equal(1, 'Cell not rendered as block when it should');
    });

    it('renders correct classes when it is part of current clue', () => {
        const cellProps = _extend(this.cellProps, {
            data: fromJS({
                containingClues: {
                    across: 5,
                    down  : 1
                }
            }),
            currentClue: {
                number   : 1,
                direction: 'across'
            }
        });

        let component = render(<Cell {...cellProps} />, this.container),
            highlightedCells = scryRenderedDOMComponentsWithClass(component, Colors.primary100);
        expect(highlightedCells.length).to.equal(0, 'Cell rendered as part of current clue');

        // Change the cell's containing clues
        cellProps.data = cellProps.data.setIn(['containingClues', 'across'], 1);
        component = render(<Cell {...cellProps} />, this.container);
        highlightedCells = scryRenderedDOMComponentsWithClass(component, Colors.primary100);
        expect(highlightedCells.length).to.equal(1, 'Cell not rendered as part of current clue');

        // Now make the cell the current cell
        cellProps.isCurrentCell = true;
        component = render(<Cell {...cellProps} />, this.container);
        highlightedCells = scryRenderedDOMComponentsWithClass(component, Colors.primary100);
        expect(highlightedCells.length).to.equal(0, 'Cell rendered as part of current clue when it is selected');

        highlightedCells = scryRenderedDOMComponentsWithClass(component, Colors.primary500);
        expect(highlightedCells.length).to.equal(1, 'Cell not rendered as current cell');
    });

    it('renders the current entry if one exists', () => {
        const cellProps = this.cellProps;

        let component = renderIntoDocument(<Cell {...cellProps} />, this.container),
            spans = scryRenderedDOMComponentsWithTag(component, 'span');

        expect(spans).to.have.length(1);
        expect(spans[0].innerHTML).to.contain('&nbsp;');

        // Now give the cell an `entry` prop
        cellProps.entry = 'A';
        component = renderIntoDocument(<Cell {...cellProps} />, this.container);
        spans = scryRenderedDOMComponentsWithTag(component, 'span');

        expect(spans).to.have.length(1);
        expect(spans[0].innerHTML).to.contain('A');
    });

    it('responds to clicks', () => {
        let clickedData = null;

        const cellProps = _extend(this.cellProps, {
            onCellClick: data => clickedData = data
        });

        const
            component = renderIntoDocument(<Cell {...cellProps} />),
            cell = scryRenderedDOMComponentsWithClass(component, 'cell-content');

        Simulate.click(cell[0]);
        expect(clickedData).to.equal(cellProps.data, 'Clicking cell did not trigger callback');
    });
});
