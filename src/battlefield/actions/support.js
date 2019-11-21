import actionTypes from '../constants/action-types';

function support(id, team) {
    return {
        type: actionTypes.SUPPORT,
        payload: {
            id, 
            team
        }
    };
}

export default support;
