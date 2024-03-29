import actionTypes from "../constants/action-types";
import actions from "../actions";
import selectors from "../selectors";

const { setActivePlayerId, setActivePlayerIndex } = actions;

const nextPlayerSelector = store => next => action => {
  switch (action.type) {
    case actionTypes.SELECT_NEXT_ACTIVE_PLAYER: {
      const state = store.getState();
      const getCharacterById = selectors.getCharacterById(state);

      const activePlayerIndex = state.activePlayer.index;
      let nextActivePlayerIndex = activePlayerIndex + 1;
      const { charactersOrderedByInitiatives } = action.payload;

      if (nextActivePlayerIndex > charactersOrderedByInitiatives.length - 1) {
        nextActivePlayerIndex = 0;
      }

      let nextActivePlayer =
        charactersOrderedByInitiatives[nextActivePlayerIndex];
      let character = getCharacterById(nextActivePlayer.id);
      let isDead = character.currentHealth <= 0;
      while (isDead) {
        if (
          nextActivePlayerIndex >=
          charactersOrderedByInitiatives.length - 1
        ) {
          nextActivePlayerIndex = -1;
        }
        nextActivePlayerIndex += 1;
        nextActivePlayer =
          charactersOrderedByInitiatives[nextActivePlayerIndex];
        character = getCharacterById(nextActivePlayer.id);
        isDead = character.currentHealth <= 0;
      }

      store.dispatch(setActivePlayerId(nextActivePlayer.id));
      store.dispatch(setActivePlayerIndex(nextActivePlayerIndex));
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default  nextPlayerSelector;
