
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


export function moveCellUp () {
    return {
        type: 'MOVE_CELL_DIRECTION',
        dir : 'UP'
    };
}


export function moveCellDown () {
    return {
        type: 'MOVE_CELL_DIRECTION',
        dir : 'DOWN'
    };
}


export function moveCellLeft () {
    return {
        type: 'MOVE_CELL_DIRECTION',
        dir : 'LEFT'
    };
}


export function moveCellRight () {
    return {
        type: 'MOVE_CELL_DIRECTION',
        dir : 'RIGHT'
    };
}
