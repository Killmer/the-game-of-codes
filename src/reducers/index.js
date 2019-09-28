import { combineReducers } from 'redux';

import activePlayer from './active-player';
import troops from './troops';

const reducer = combineReducers({
    activePlayer,
    troops
});

export default reducer;
