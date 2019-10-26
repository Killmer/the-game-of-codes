import actionTypes from "../constants/action-types";
import { setCursor } from "../actions/set-cursor";
import selectors from "../selectors";
import checkMeleeAttackConstraints from '../helpers/check-melee-attack-constraints';

const detectCursor = ({element, activePlayer, selectedPlayer, attackers, defenders}) => {
  if (element === null) {
    return "default";
  }

  if (element.type === "character") {
    const isEnemy = activePlayer.team !== selectedPlayer.team;
    const isDead = selectedPlayer.currentHealth <= 0;

    if (isDead) {
      return "disabled";
    }
    if (isEnemy) {
      if (activePlayer.attackType === "single") {
        return "bow";
      }
      if (activePlayer.attackType === "massive") {
        return "scroll";
      }
      if (activePlayer.attackType === "melee" )  {
        if (checkMeleeAttackConstraints({
          attackers,
          defenders,
          targetHero: selectedPlayer,
          activePlayer
        })) {
          return "sword";
        } else {
          return "disabled";
        }
      }
    }

    if (!isEnemy) {
      return "default";
    }
  }
}

const cursorMiddleware = store => next => action => {
  switch (action.type) {
    case actionTypes.SET_HOVERED_ELEMENT: {
      const state = store.getState();
      const getCharacterById = selectors.getCharacterById(state);
      const { element } = action.payload;
      const activePlayerId = state.activePlayer.id;
      const activePlayer = getCharacterById(activePlayerId);
      const selectedPlayer = element && getCharacterById(element.id);
      const attackers = selectors.getAttackers(state);
      const defenders = selectors.getDefenders(state);

      
      const nextCursor = detectCursor({element, activePlayer, selectedPlayer, attackers, defenders });
      store.dispatch(setCursor(nextCursor));
      
      next(action);
      break;
    }
    case actionTypes.SELECT_NEXT_ACTIVE_PLAYER: {
      const state = store.getState();
      const getCharacterById = selectors.getCharacterById(state);
      const element = selectors.getHoveredElement(state);
      const activePlayerId = state.activePlayer.id;
      const activePlayer = getCharacterById(activePlayerId);
      const selectedPlayer = getCharacterById(element.id);
      const attackers = selectors.getAttackers(state);
      const defenders = selectors.getDefenders(state);
      const nextCursor = detectCursor({element, activePlayer, selectedPlayer, attackers, defenders });
      
      store.dispatch(setCursor(nextCursor));
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default cursorMiddleware;
