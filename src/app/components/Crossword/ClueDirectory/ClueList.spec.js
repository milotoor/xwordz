
import React from 'react';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-addons-test-utils';

import { OrderedMap, Map } from 'immutable';
import { assert, expect } from 'chai';

import Colors from '../../../../util/colors';
import { orderedClueMap } from '../../../reducers/helpers/initPuzzleClues';
import ClueList from './ClueList';


// Test data
const clues = orderedClueMap(Map({
    1: 'Compelling and witty clue',
    2: 'Second down clue',
    4: 'Pretty small puzzle if no 3 down, eh?'
}));

const currentClue = {
    direction: 'down',
    number   : 1,
    text     : 'Compelling and witty clue'
};

// Test component
const clueList =
    <ClueList
        clues={clues}
        direction="down"
        currentClue={currentClue}
        onClueClick={() => {}} />;


describe('ClueList', () => {
    it('renders all of the clues in order', () => {
        const
            component = renderIntoDocument(clueList),
            renderedClues = scryRenderedDOMComponentsWithClass(component, 'clue');

        // Should have the right number, in the right order
        expect(renderedClues.length).to.equal(3);
        expect(renderedClues[0].textContent).to.contain('1.Compelling and witty clue');
        expect(renderedClues[1].textContent).to.contain('2.Second down clue');
        expect(renderedClues[2].textContent).to.contain('4.Pretty small puzzle if no 3 down, eh?');
    });

    it('renders the current clue with a highlight', () => {
        const
            component = renderIntoDocument(clueList),
            renderedClues = scryRenderedDOMComponentsWithClass(component, 'clue');

        expect(renderedClues[0].className).to.contain(Colors.accent200, 'selected clue is not highlighted');
        expect(renderedClues[1].className).to.not.contain(Colors.accent200, 'unselected clue is highlighted');
        expect(renderedClues[2].className).to.not.contain(Colors.accent200, 'unselected clue is highlighted');
    });

    it('calls the provided callback when a clue is clicked', () => {
        // Make a different component for this test, so as to provide a meaningful `onClueClick`
        let registeredClickCount = 0;
        const _clueList =
            <ClueList
                clues={clues}
                direction="down"
                currentClue={currentClue}
                onClueClick={() => registeredClickCount++} />;

        const
            component     = renderIntoDocument(_clueList),
            renderedClues = scryRenderedDOMComponentsWithClass(component, 'clue-content');

        // Clicking the current clue shouldn't do anything
        Simulate.click(renderedClues[0]);
        expect(registeredClickCount).to.equal(0);

        // Clicking on any other should trigger the callback
        Simulate.click(renderedClues[1]);
        expect(registeredClickCount).to.equal(1);
    });
});
