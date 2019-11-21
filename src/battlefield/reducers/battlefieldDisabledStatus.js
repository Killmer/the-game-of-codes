import actionTypes from '../constants/action-types';

function battlefieldDisabledStatus (state = false, action) {
    switch (action.type) {
        case actionTypes.SET_BATTLEFIELD_STATUS: 
            return action.payload.status;
        case actionTypes.TOGGLE_BATTLEFIELD_STATUS: 
            return !state;
        default:
            return state;
    }
}

export default battlefieldDisabledStatus;