import actionTypes from "../constants/action-types";
import { setCursor } from "../actions/set-cursor";
import selectors from "../selectors";
import checkMeleeAttackConstraints from '../helpers/check-melee-attack-constraints';

const cursorMiddleware = store => next => action => {
  switch (action.type) {
    case actionTypes.SET_HOVERED_ELEMENT: {
      const state = store.getState();
      const getCharacterById = selectors.getCharacterById(state);
      const { element } = action.payload;
      if (element === null) {
        store.dispatch(setCursor("default"));
        next(action);
        break;
      }

      if (element.type === "character") {
        const activePlayerId = state.activePlayer.id;
        const activePlayer = getCharacterById(activePlayerId);
        const selectedPlayer = getCharacterById(element.id);
        const isEnemy = activePlayer.team !== selectedPlayer.team;
        const isDead = selectedPlayer.currentHealth <= 0;

        if (isDead) {
          store.dispatch(setCursor("disabled"));
        }
        if (isEnemy) {
          if (activePlayer.attackType === "single") {
            store.dispatch(setCursor("bow"));
          }
          if (activePlayer.attackType === "massive") {
            store.dispatch(setCursor("scroll"));
          }
          if (activePlayer.attackType === "melee" )  {
            const attackers = selectors.getAttackers(state);
            const defenders = selectors.getDefenders(state);
            if (checkMeleeAttackConstraints({
              attackers,
              defenders,
              targetHero: selectedPlayer,
              activePlayer
            })) {
              store.dispatch(setCursor("sword"));
            } else {
              store.dispatch(setCursor("disabled"));
            }
          }
        }
      }
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default cursorMiddleware;
