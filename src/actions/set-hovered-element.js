import actionTypes from '../constants/action-types';

export function setHoveredElement(element) {
    return {
        type: actionTypes.SET_HOVERED_ELEMENT,
        payload: {
            element
        }
    };
}
