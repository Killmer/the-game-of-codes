import actionTypes from "../constants/action-types";
import actions from "../actions";
import selectors from "../selectors";

// const { setActivePlayerIndex } = actions;

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
        alert('DEFENDERS TEAM WIN');
      }

      if(defendersTeamIsDead) {
        alert('ATTACKERS TEAM WIN');
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
