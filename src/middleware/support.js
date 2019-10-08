import actionTypes from "../constants/action-types";
import { support } from "../actions/support";
import { applyHeal } from "../actions/apply-heal";
import selectors from "../selectors";
import getNumberInRange from '../helpers/get-number-in-range';

const supportMiddleware = store => next => action => {
  switch (action.type) {
    case actionTypes.SUPPORT: {
      const state = store.getState();
      const getCharacterById = selectors.getCharacterById(state);

      // calculate current active character heal
      const activePlayerId = state.activePlayer.id;
      const activePlayer = getCharacterById(activePlayerId);
      const [minAmound, maxAmound] = activePlayer.attack.split('-');
      const heal = getNumberInRange(Number(minAmound), Number(maxAmound));
      const { id, team } = action.payload;
  
      store.dispatch(applyHeal(id, heal, team));
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default  supportMiddleware;
