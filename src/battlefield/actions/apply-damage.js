import actionTypes from '../constants/action-types';

function applyDamage(id, damage, team) {
    return {
        type: actionTypes.APPLY_DAMAGE,
        payload: {
            id, 
            damage,
            team
        }
    };
}

export default applyDamage;