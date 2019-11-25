import actionTypes from "../constants/action-types";
import actions from "../actions";
import selectors from "../selectors";

const { showDialog } = actions;

const finishBattle = store => next => action => {
  switch (action.type) {
    case actionTypes.SELECT_NEXT_ACTIVE_PLAYER: {
      const state = store.getState();
      const attackers = selectors.getAttackers(state);
      const defenders = selectors.getDefenders(state);

      console.log('attackers',attackers);
      console.log('defenders',defenders);
      
      const attackerTeamIsDead = attackers.every( attacker => attacker.currentHealth <= 0);
      const defendersTeamIsDead = defenders.every( defenders => defenders.currentHealth <= 0);

      console.log('attackerTeamIsDead',attackerTeamIsDead);
      console.log('defendersTeamIsDead',defendersTeamIsDead);

      if(attackerTeamIsDead) {
        store.dispatch(showDialog({title: 'DEFENDERS WINS'}));
        next(action);
        break;
      }

      if(defendersTeamIsDead) {
        store.dispatch(showDialog({title: 'ATTACKERS WINS'}));
      }


      // store.dispatch(setActivePlayerIndex(nextActivePlayerIndex));
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default  finishBattle;
