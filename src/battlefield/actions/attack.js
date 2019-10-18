import actionTypes from '../constants/action-types';

export function attack(id, team) {
    return {
        type: actionTypes.ATTACK,
        payload: {
            id, 
            team
        }
    };
}
