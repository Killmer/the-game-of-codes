import actionTypes from '../constants/action-types';

const initiatives = (state = [], action) => {
    switch(action.type) {
        case actionTypes.SET_INITIATIVES:
            return action.payload.initiatives;
        default: 
            return state;
    }
}

export default initiatives;