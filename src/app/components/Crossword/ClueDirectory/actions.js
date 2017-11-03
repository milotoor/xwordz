
import * as events from '../../../reducers/events';

/* eslint-disable import/prefer-default-export */
export const changeClue = (direction, number) => ({
    type: events.CHANGE_CLUE,
    clue: {
        direction,
        number
    }
});
