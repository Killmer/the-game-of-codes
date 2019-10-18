import actionTypes from '../constants/action-types';

export function setCursor(cursor) {
    return {
        type: actionTypes.SET_CURSOR,
        payload: {
            cursor
        }
    };
}
