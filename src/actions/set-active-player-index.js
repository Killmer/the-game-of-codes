import actionTypes from '../constants/action-types';

export function setActivePlayerIndex(index) {
    return {
        type: actionTypes.SET_ACTIVE_PLAYER_INDEX,
        payload: {
            index
        }
    };
}
