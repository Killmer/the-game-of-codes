import actionTypes from "../constants/action-types";
import actions from "../actions";
import selectors from "../selectors";
import getNumberInRange from "../helpers/get-number-in-range";
import { get } from "../../animation/collection";

const { applyDamage, setBattlefieldStatus, selectNextActivePlayer } = actions;
const getCharacterAnimationInstance = get;

const calculateDamage = (targetHero, activeHeroAttack) => {
  const [minDamage, maxDamage] = activeHeroAttack.split("-");
  let isDying = false;
  let damage = getNumberInRange(Number(minDamage), Number(maxDamage));

  if (damage >= targetHero.currentHealth) {
    damage = damage - (damage - targetHero.currentHealth);
    isDying = true;
  }

  return { damage, isDying };
};

const attackMiddleware = store => next => action => {
  switch (action.type) {
    case actionTypes.ATTACK: {
      const state = store.getState();
      const getCharacterById = selectors.getCharacterById(state);
      const charactersOrderedByInitiatives = selectors.getInitiatives(state);
      const { id, team } = action.payload;

      // calculate current active character damage
      const activePlayerId = state.activePlayer.id;
      const activePlayer = getCharacterById(activePlayerId);

      const enemyTeam =
        team === "attackers"
          ? selectors.getAttackers(state)
          : selectors.getDefenders(state);
      const enemyHero = getCharacterById(id);
      const { damage, isDying } = calculateDamage(
        enemyHero,
        activePlayer.attack
      );

      if (activePlayer.attackType === "massive") {
        Promise.all([
          getCharacterAnimationInstance(activePlayerId).attack(),
          getCharacterAnimationInstance(activePlayer.attackId).play()
        ]).then(() => {
          enemyTeam.forEach((hero, i) => {
            const isDead = hero.currentHealth <= 0;
            const { damage, isDying } = calculateDamage(
              hero,
              activePlayer.attack
            );
            store.dispatch(applyDamage(hero.id, damage, team));
            //apply massive animation

            if (isDying && isDead) return;
            if (isDying && !isDead) {
              getCharacterAnimationInstance(hero.id).die();
              return;
            }
            getCharacterAnimationInstance(hero.id).receiveDamage();
          });

          // SELECT NEXT PLAYER
          store.dispatch(
            selectNextActivePlayer(charactersOrderedByInitiatives)
          );
          store.dispatch(setBattlefieldStatus(false));
          next(action);
        });
        break;
      }
      if (activePlayer.attackType === "single") {
        Promise.all([
          getCharacterAnimationInstance(activePlayerId).attack(),
          getCharacterAnimationInstance(activePlayer.attackId).play()
        ]).then(() => {
          store.dispatch(applyDamage(id, damage, team));
          if (isDying) {
            getCharacterAnimationInstance(id).die();
          } else {
            getCharacterAnimationInstance(id).receiveDamage();
          }

          // SELECT NEXT PLAYER
          store.dispatch(
            selectNextActivePlayer(charactersOrderedByInitiatives)
          );
          store.dispatch(setBattlefieldStatus(false));
          next(action);
        });
        break;
      }
      store.dispatch(applyDamage(id, damage, team));
      //apply animation
      if (isDying) {
        getCharacterAnimationInstance(id).die();
      } else {
        getCharacterAnimationInstance(id).receiveDamage();
      }
      getCharacterAnimationInstance(activePlayerId).attack();

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

export default attackMiddleware;
