
import * as events from '../../../reducers/events';
import { getCellState, isCurrentCell } from './accessors';

/* eslint-disable import/prefer-default-export */
export const clickCell = (row, col) => {
    const cellState = getCellState(row, col);

    // If it's a block cell then a click does nothing
    if (cellState.isBlockCell) {
        return null;
    }

    if (isCurrentCell(row, col)) {
        return {
            type: events.TOGGLE_DIRECTION
        };
    }

    return {
        type: events.CHANGE_POSITION,
        row,
        col
    };
};
