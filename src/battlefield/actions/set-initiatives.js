import actionTypes from '../constants/action-types';

const setInitiatives = (initiatives) =>({
    type: actionTypes.SET_INITIATIVES,
    payload: {
        initiatives,
    }
});

export default setInitiatives;