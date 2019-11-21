import setActivePlayerId from './set-active-player-id';
import setActivePlayerIndex from './set-active-player-index';
import applyDamage from './apply-damage';
import applyHeal from './apply-heal';
import toggleBattlefieldStatus from './toggle-battlefield-status';
import setBattlefieldStatus from './set-battlefield-status';
import setInitiatives from './set-initiatives';
import support from './support';
import attack from './attack';
import selectNextActivePlayer from './select-next-active-player';

export default {
    setActivePlayerId,
    setActivePlayerIndex,
    selectNextActivePlayer,
    applyDamage,
    applyHeal,
    setBattlefieldStatus,
    setInitiatives,
    support,
    attack,
    toggleBattlefieldStatus,
};