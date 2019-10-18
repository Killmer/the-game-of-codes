import actionTypes from '../constants/action-types';

export function support(id, team) {
    return {
        type: actionTypes.SUPPORT,
        payload: {
            id, 
            team
        }
    };
}
