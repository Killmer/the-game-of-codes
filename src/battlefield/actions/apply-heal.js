import actionTypes from '../constants/action-types';

function applyHeal(id, heal, team) {
    return {
        type: actionTypes.APPLY_HEAL,
        payload: {
            id, 
            heal,
            team
        }
    };
}

export default applyHeal;