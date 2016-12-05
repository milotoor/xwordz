
const currentClue = (puzzle, position) => {
    const direction = position.get('dir');
    const clueNumber = puzzle.getIn([
        'grid',
        position.get('row'),
        position.get('col'),
        'containingClues',
        direction
    ]);

    return {
        number: clueNumber,
        text  : puzzle.getIn(['clues', direction, clueNumber]),
        direction
    };
};


const currentCell = (clues, position) => {
    const
        row = position.get('row'),
        col = position.get('col');

    return clues.getIn([row, col]);
};


export default {
    currentClue,
    currentCell
};
