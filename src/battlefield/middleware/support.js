import actionTypes from "../constants/action-types";
import actions from "../actions";
import selectors from "../selectors";
import getNumberInRange from '../helpers/get-number-in-range';

const { applyHeal, setBattlefieldStatus, selectNextActivePlayer } = actions;

const supportMiddleware = store => next => action => {
  switch (action.type) {
    case actionTypes.SUPPORT: {
      const state = store.getState();
      const getCharacterById = selectors.getCharacterById(state);
      const charactersOrderedByInitiatives = selectors.getInitiatives(state);

      // calculate current active character heal
      const activePlayerId = state.activePlayer.id;
      const activePlayer = getCharacterById(activePlayerId);
      const [minAmound, maxAmound] = activePlayer.attack.split('-');
      const heal = getNumberInRange(Number(minAmound), Number(maxAmound));
      const { id, team } = action.payload;
  
      store.dispatch(applyHeal(id, heal, team));

       // SELECT NEXT PLAYER
       store.dispatch(selectNextActivePlayer(charactersOrderedByInitiatives));
       store.dispatch(setBattlefieldStatus(false));
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default  supportMiddleware;
