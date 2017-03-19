
import { getCurrentCell } from './Grid/accessors';

export const currentClue = (state) => {
    const direction = state.getIn(['position', 'dir']);
    const curClueNumber = getCurrentCell().containingClues[direction];

    return {
        direction,
        text  : state.getIn(['puzzle', 'clues', direction, curClueNumber]),
        number: curClueNumber
    };
};
