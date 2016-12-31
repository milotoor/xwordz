
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


export function changePosAttrs ({ row, col, direction }) {
    return {
        type : 'CHANGE_POS_ATTRS',
        attrs: { row, col, direction }
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


export function enterCellContent (content) {
    return {
        type: 'ENTER_CELL_CONTENT',
        content
    };
}
