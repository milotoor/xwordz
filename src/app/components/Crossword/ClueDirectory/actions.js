
import * as events from '../../../reducers/events';


export const changeClue = (direction, number) => ({
    type: events.CHANGE_CLUE,
    clue: {
        direction,
        number
    }
});
