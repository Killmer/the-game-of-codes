import actionTypes from '../constants/action-types';

function id (state = '', action) {
    switch (action.type) {
        case actionTypes.SET_ACTIVE_PLAYER_ID: 
            return action.payload.id;

        default:
            return state;
    }
}

export default id;