
import { getCurrentCell } from './Grid/accessors';

/* eslint-disable import/prefer-default-export */
export const currentClue = (state) => {
    const direction = state.getIn(['position', 'dir']);
    const curClueNumber = getCurrentCell().containingClues[direction];

    return {
        direction,
        text  : state.getIn(['puzzle', 'clues', direction, curClueNumber]),
        number: curClueNumber
    };
};
