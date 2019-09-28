import actionTypes from '../constants/action-types';

export function setActivePlayer(id) {
    return {
        type: actionTypes.SET_ACTIVE_PLAYER,
        payload: {
            id
        }
    };
}
