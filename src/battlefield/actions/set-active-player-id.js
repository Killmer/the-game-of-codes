import actionTypes from '../constants/action-types';

function setActivePlayerId(id) {
    return {
        type: actionTypes.SET_ACTIVE_PLAYER_ID,
        payload: {
            id
        }
    };
}

export default setActivePlayerId;
