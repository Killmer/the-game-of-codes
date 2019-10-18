import actionTypes from '../constants/action-types';

function hoveredElement (state = null, action) {
    switch (action.type) {
        case actionTypes.SET_HOVERED_ELEMENT: 
            return action.payload.element;

        default:
            return state;
    }
}

export default hoveredElement;