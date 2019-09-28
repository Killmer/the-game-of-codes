import actionTypes from '../constants/action-types';

function activePlayer(state = '', action) {
    switch (action.type) {
        case actionTypes.SET_ACTIVE_PLAYER: 
            return action.payload.id;

        default:
            return state;
    }
}

export default activePlayer;