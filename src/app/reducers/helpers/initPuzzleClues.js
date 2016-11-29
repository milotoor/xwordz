
import { Map } from 'immutable';


export default function initPuzzleClues (puzzle) {
    // Iterate through the across and down clues, replacing the string keys with numeric equivalents
    const clues = puzzle.get('clues');

    /**
     * Helper method for converting the unordered clue `Map`s into `OrderedMap`s, ordered by the
     * clue number (represented as an int). The Immutable library does not guarantee any ordering
     * when you iterate over a `Map` (though it will iterate in the same order with each iteration),
     * but an `OrderedMap` will always iterate over its key-value pairs in the order they are
     * provided. This is mandatory for properly rendering the ClueDirectory
     */
    const orderClueMap = clueMap => {
        const ordered = clueMap.sortBy(
            (clue, clueNum) => parseInt(clueNum, 10),
            (numA, numB) => numA > numB ? 1 : -1
        );

        // Make the `orderedClueSet` mutable so that we can iterate quickly over its clues and
        // make all the keys ints
        return ordered.withMutations(map => {
            for (const [clueNum, clue] of map) {
                map.delete(clueNum);
                map.set(parseInt(clueNum, 10), clue);
            }
        });
    };

    const
        acrosses = orderClueMap(clues.get('across')),
        downs    = orderClueMap(clues.get('down'));

    // Rebuild the clues
    return puzzle.set('clues', new Map({
        across: acrosses,
        down  : downs
    }));
}
