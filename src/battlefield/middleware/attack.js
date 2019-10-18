import actionTypes from "../constants/action-types";
import { applyDamage } from "../actions/apply-damage";
import selectors from "../selectors";
import getNumberInRange from "../helpers/get-number-in-range";
import { get } from '../../animation/collection';

const calculateDamage = (targetHero, activeHeroAttack) => {
  const [minDamage, maxDamage] = activeHeroAttack.split("-");
  let isDying = false;
  let damage = getNumberInRange(Number(minDamage), Number(maxDamage));

  if (damage >= targetHero.currentHealth) {
    damage = damage - (damage - targetHero.currentHealth);
    isDying = true;
  }

  return {damage, isDying};
}

const attackMiddleware = store => next => action => {
  switch (action.type) {
    case actionTypes.ATTACK: {
      const state = store.getState();
      const getCharacterById = selectors.getCharacterById(state);
      const { id, team } = action.payload;

      // calculate current active character damage
      const activePlayerId = state.activePlayer.id;
      const activePlayer = getCharacterById(activePlayerId);

      const enemyTeam =
      team === "attackers"
      ? selectors.getAttackers(state)
      : selectors.getDefenders(state);
      const enemyHero = getCharacterById(id);
      const {damage, isDying} = calculateDamage(enemyHero, activePlayer.attack);

      if (activePlayer.attackType === "massive") {
        get(activePlayerId).attack();
        enemyTeam.forEach((hero, i) => {
          const isDead = hero.currentHealth <= 0;
          const {damage, isDying} = calculateDamage(hero, activePlayer.attack);
          store.dispatch(applyDamage(hero.id, damage, team));
          //apply massive animation

          if (isDying && isDead) return;
          if (isDying && !isDead) {
            get(hero.id).die();
            return;
          }
          get(hero.id).receiveDamage();
        });
        next(action);
        break;
      }
      store.dispatch(applyDamage(id, damage, team));
      //apply animation
      if(isDying) {
        get(id).die();
      } else {
        get(id).receiveDamage();
      }
      get(activePlayerId).attack();
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default attackMiddleware;
