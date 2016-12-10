
import isUndefined from 'lodash/isUndefined';


const clueNumber = ({ puzzle, position, direction, state }) => {
    if (!isUndefined(state)) {
        puzzle = state.get('puzzle');
        position = state.get('position');
    }

    if (isUndefined(direction)) {
        direction = position.get('dir');
    }

    return puzzle.getIn([
        'grid',
        position.get('row'),
        position.get('col'),
        'containingClues',
        direction
    ]);
};


const currentClue = (puzzle, position) => {
    const direction  = position.get('dir');
    const number = clueNumber({ puzzle, position });

    return {
        text: puzzle.getIn(['clues', direction, number]),
        number,
        direction
    };
};


const currentCell = (grid, position) => (
    grid.getIn([
        position.get('row'),
        position.get('col')
    ])
);


export default {
    currentClue,
    currentCell,
    clueNumber
};
