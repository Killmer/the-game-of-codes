import actionTypes from '../constants/action-types';

function selectNextActivePlayer(charactersOrderedByInitiatives) {
    return {
        type: actionTypes.SELECT_NEXT_ACTIVE_PLAYER,
        payload: {
            charactersOrderedByInitiatives
        }
    };
}

export default selectNextActivePlayer;