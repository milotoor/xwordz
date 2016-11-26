import { Map } from 'immutable';

function setConnectionState (state, connectionState, connected) {
    return state.set('connection', new Map({
        state: connectionState,
        connected
    }));
}

function setState (state, newState) {
    return state.merge(newState);
}

function vote (state, entry) {
    const currentRound = state.getIn(['vote', 'round']);
    const currentPair = state.getIn(['vote', 'pair']);
    if (currentPair && currentPair.includes(entry)) {
        return state.set('myVote', new Map({
            round: currentRound,
            entry
        }));
    }
    return state;
}

function resetVote (state) {
    const votedForRound = state.getIn(['myVote', 'round']);
    const currentRound = state.getIn(['vote', 'round']);
    return votedForRound === currentRound
        ? state
        : state.remove('myVote');
}

export default function (state = new Map(), action) {
    switch (action.type) {
        case 'SET_CLIENT_ID':
            return state.set('clientId', action.clientId);
        case 'SET_CONNECTION_STATE':
            return setConnectionState(state, action.state, action.connected);
        case 'SET_STATE':
            return resetVote(setState(state, action.state));
        case 'VOTE':
            return vote(state, action.entry);
        default:
            return state;
    }
}
