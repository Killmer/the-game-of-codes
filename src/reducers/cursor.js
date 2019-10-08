import actionTypes from '../constants/action-types';

function cursor (state = 'default', action) {
    switch (action.type) {
        case actionTypes.SET_CURSOR: 
            return action.payload.cursor;

        default:
            return state;
    }
}

export default cursor;