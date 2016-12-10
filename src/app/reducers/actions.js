
export function setState (puzzle) {
    return {
        type: 'INIT_STATE',
        puzzle
    };
}


export function changeClue (direction, number) {
    return {
        type: 'CHANGE_CLUE',
        clue: {
            direction,
            number
        }
    };
}


export function changePosAttrs (attrs) {
    return {
        type: 'CHANGE_POS_ATTRS',
        attrs
    };
}
