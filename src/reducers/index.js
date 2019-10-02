import { combineReducers } from 'redux';

import id from './active-player-id';
import index from './active-player-index';
import troops from './troops';

const reducer = combineReducers({
    activePlayer: combineReducers({
        id,
        index,
    }),
    troops,
});

export default reducer;
