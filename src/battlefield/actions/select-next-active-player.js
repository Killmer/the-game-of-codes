import actionTypes from '../constants/action-types';

export function selectNextActivePlayer(charactersOrderedByInitiatives) {
    return {
        type: actionTypes.SELECT_NEXT_ACTIVE_PLAYER,
        payload: {
            charactersOrderedByInitiatives
        }
    };
}