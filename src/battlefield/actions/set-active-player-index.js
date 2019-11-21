import actionTypes from '../constants/action-types';

function setActivePlayerIndex(index) {
    return {
        type: actionTypes.SET_ACTIVE_PLAYER_INDEX,
        payload: {
            index
        }
    };
}

export default setActivePlayerIndex;
