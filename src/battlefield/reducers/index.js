import { combineReducers } from 'redux';

import id from './active-player-id';
import index from './active-player-index';
import hoveredElement from './hovered-element';
import cursor from './cursor';
import troops from './troops';
import battlefieldDisabledStatus from './battlefieldDisabledStatus';
import initiatives from './initiatives';
import dialog from './dialog';

const reducer = combineReducers({
    activePlayer: combineReducers({
        id,
        index
    }),
    initiatives,
    troops,
    ui: combineReducers({
        hoveredElement,
        cursor,
        battlefieldDisabledStatus,
        dialog,
    }),
});

export default reducer;
