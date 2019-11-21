import actionTypes from '../constants/action-types';

function attack(id, team) {
    return {
        type: actionTypes.ATTACK,
        payload: {
            id, 
            team
        }
    };
}

export default attack;
