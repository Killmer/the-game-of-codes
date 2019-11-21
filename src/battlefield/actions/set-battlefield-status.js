import actionTypes from '../constants/action-types';

function setBattlefieldStatus(status) {
    return {
        type: actionTypes.SET_BATTLEFIELD_STATUS,
        payload: {
            status, 
        }
    };
}

export default setBattlefieldStatus;