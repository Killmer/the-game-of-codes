import actionTypes from '../constants/action-types';

export function attack(id, damage) {
    return {
        type: actionTypes.ATTACK,
        payload: {
            id, 
            damage
        }
    };
}
