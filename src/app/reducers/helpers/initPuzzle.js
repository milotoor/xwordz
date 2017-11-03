
import { Map, OrderedMap, fromJS } from 'immutable';
import _map from 'lodash/map';


/**
 * Helper method for converting the unordered clue `Map`s into `OrderedMap`s, ordered by the
 * clue number (represented as an int). The Immutable library does not guarantee any ordering
 * when you iterate over a `Map` (though it will iterate in the same order with each iteration),
 * but an `OrderedMap` will always iterate over its key-value pairs in the order they are
 * provided. This is mandatory for properly rendering the ClueDirectory
 */
export const orderedClueMap = (clueList) => {
    // Transform the clue numbers from strings to integers...
    const orderedClues = _map(clueList, (clueText, clueNum) => [parseInt(clueNum, 10), clueText]);

    // ...then sort them numerically ascending.
    orderedClues.sort((setA, setB) => setA[0] < setB[0] ? -1 : 1);

    return new OrderedMap(orderedClues);
};


/**
 * Iterates through the across and down clues, creating ordered maps of them
 */
export default ({ clues, grid, info }) => new Map({
    clues: new Map({
        across: orderedClueMap(clues.across),
        down  : orderedClueMap(clues.down)
    }),

    grid: fromJS(grid),
    info: fromJS(info)
});
