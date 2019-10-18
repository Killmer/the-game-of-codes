import actionTypes from '../constants/action-types';

export function applyHeal(id, heal, team) {
    return {
        type: actionTypes.APPLY_HEAL,
        payload: {
            id, 
            heal,
            team
        }
    };
}
