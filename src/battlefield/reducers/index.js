import { combineReducers } from 'redux';

import id from './active-player-id';
import index from './active-player-index';
import hoveredElement from './hovered-element';
import cursor from './cursor';
import troops from './troops';

const reducer = combineReducers({
    activePlayer: combineReducers({
        id,
        index
    }),
    troops,
    ui: combineReducers({
        hoveredElement,
        cursor,
    }),
});

export default reducer;
