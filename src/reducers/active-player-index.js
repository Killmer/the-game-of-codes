import actionTypes from '../constants/action-types';

function index (state = 0, action) {
    switch (action.type) {
        case actionTypes.SET_ACTIVE_PLAYER_INDEX: 
            return action.payload.index;

        default:
            return state;
    }
}

export default index;