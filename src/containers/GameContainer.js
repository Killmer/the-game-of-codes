import { connect } from 'react-redux';
import Game from '../components/Game';
import  { setActivePlayer } from '../actions/set-active-player';
import  { applyDamage } from '../actions/apply-damage';
import selectors from '../selectors';

function mapStateToProps(state) {
    return {
        activePlayer: state.activePlayer,
        attackers: selectors.getAttackers(state),
        defenders: selectors.getDefenders(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setActivePlayer: (id) => dispatch(setActivePlayer(id)),
        applyDamage: (id, damage, team) => dispatch(applyDamage(id, damage, team))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);