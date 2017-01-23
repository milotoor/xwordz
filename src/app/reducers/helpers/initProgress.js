
import { fromJS } from 'immutable';
import _isUndefined from 'lodash/isUndefined';

/**
 * Initializes the `progress` state attribute. If the argument is truthy (indicating that it has
 * already been constructed, which most likely means the user has already begun this puzzle and has
 * made some progress on it already), then all we need to do is return it wrapped in a Map.
 * Otherwise, if it's undefined, we will need to generate it. The structure of the progress state
 * attribute is simple. It will consist of a list of lists, with each list representing a single row
 * of the grid.
 *
 * @param {array} grid
 *   The array of arrays that represents the grid of the puzzle
 *
 * @param {array} [progress]
 *   The array of arrays that represents the user's current progress on the puzzle
 */
export default function initProgress (grid, progress) {
    if (_isUndefined(progress)) {
        progress = [];

        // Iterate over the cells of the grid, compiling an array of arrays with each element
        // initialized to `null`. If the cell is a block cell, it will be initialized to a period
        // instead.
        for (const row of grid) {
            const rowProgress = [];
            progress.push(rowProgress);
            for (const cell of row) {
                if (cell.isBlockCell) {
                    rowProgress.push('.');
                } else {
                    rowProgress.push(null);
                }
            }
        }
    }

    return fromJS(progress);
}
