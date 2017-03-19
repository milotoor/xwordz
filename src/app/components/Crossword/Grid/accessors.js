
import store from '../../../store';


export const getCellState = (row, col) => (
    store
        .getState()
        .getIn(['puzzle', 'grid', row, col])
        .toJS()
);


export const getCurrentCell = () => {
    const state = store.getState();
    const position = state.get('position');
    const grid = state.getIn(['puzzle', 'grid']);

    return grid.getIn([
        position.get('row'),
        position.get('col')
    ]).toJS();
};


export const isCurrentCell = (row, col) => {
    const position = store.getState().get('position');
    return position.get('row') === row && position.get('col') === col;
};
