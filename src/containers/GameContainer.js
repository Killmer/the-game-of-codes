import React from "react";
import { connect } from "react-redux";
import Game from "../components/Game";
import { setActivePlayer } from "../actions/set-active-player";
import { applyDamage } from "../actions/apply-damage";
import { applyHeal } from "../actions/apply-heal";
import selectors from "../selectors";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        activePlayerId: 1,
    };

    this.onCharacterClick = this.onCharacterClick.bind(this);
  }
  componentDidMount() {
    const { setActivePlayer } = this.props;
    setActivePlayer(this.state.activePlayerId);
  }

  calculateInitiatives() {
    const { attackers, defenders } = this.props;
    const heroesInitiatives = [...attackers, ...defenders];
    heroesInitiatives.sort((character1, character2) => {
      return character2.initiative - character1.initiative;
    });
    return heroesInitiatives;
  }

  onCharacterClick(id, team) {
    const {
      setActivePlayer,
      activePlayerId,
      attackers,
      defenders,
      applyHeal,
      applyDamage
    } = this.props;
    const activePlayer =
      attackers.find(character => character.id === activePlayerId) ||
      defenders.find(character => character.id === activePlayerId);
    if (team === activePlayer.team) {
      applyHeal(id, activePlayer.attack, team);
    } else {
      applyDamage(id, activePlayer.attack, team);
    }
    setActivePlayer(this.state.activePlayerId + 1);
  }

  render() {
    return <Game {...this.props} onCharacterClick={this.onCharacterClick} />;
  }
}

function mapStateToProps(state) {
  return {
    activePlayerId: state.activePlayer,
    attackers: selectors.getAttackers(state),
    defenders: selectors.getDefenders(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActivePlayer: id => dispatch(setActivePlayer(id)),
    applyDamage: (id, damage, team) => dispatch(applyDamage(id, damage, team)),
    applyHeal: (id, heal, team) => dispatch(applyHeal(id, heal, team))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);
