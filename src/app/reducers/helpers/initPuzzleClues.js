
import { Map } from 'immutable';


export default function initPuzzleClues (puzzle) {
    // Iterate through the across and down clues, replacing the string keys with numeric equivalents
    const clues  = puzzle.get('clues');
    let acrosses = clues.get('across'),
        downs    = clues.get('down');

    const replaceClueNum = (clueSet, num) => {
        const clue = clueSet.get(num);
        return clueSet
            .delete(num)
            .set(parseInt(num, 10), clue);
    };

    for (const clueNum of acrosses.keys()) {
        acrosses = replaceClueNum(acrosses, clueNum);
    }

    for (const clueNum of downs.keys()) {
        downs = replaceClueNum(downs, clueNum);
    }

    // Rebuild the clues
    return puzzle.set('clues', new Map({
        across: acrosses,
        down  : downs
    }));
};
