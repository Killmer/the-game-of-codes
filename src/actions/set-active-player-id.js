import actionTypes from '../constants/action-types';

export function setActivePlayerId(id) {
    return {
        type: actionTypes.SET_ACTIVE_PLAYER_ID,
        payload: {
            id
        }
    };
}
