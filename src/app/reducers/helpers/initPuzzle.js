
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
    const orderedClues =
        // Transform the clue numbers from strings to integers...
        _map(clueList, (clueText, clueNum) => [parseInt(clueNum, 10), clueText])

        // ...then sort them numerically ascending.
        .sort((numA, numB) => numA < numB ? -1 : 1);

    return new OrderedMap(orderedClues);
};


export default function initPuzzle (puzzle) {
    // Iterate through the across and down clues, replacing the string keys with numeric equivalents
    const clues = puzzle.clues;

    return new Map({
        // Rebuild the clues
        clues: new Map({
            across: orderedClueMap(clues.across),
            down  : orderedClueMap(clues.down)
        }),

        grid: fromJS(puzzle.grid),
        info: fromJS(puzzle.info)
    });
}
