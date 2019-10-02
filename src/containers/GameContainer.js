import React from "react";
import { connect } from "react-redux";
import Game from "../components/Game";
import { setActivePlayerId } from "../actions/set-active-player-id";
import { setActivePlayerIndex } from "../actions/set-active-player-index";
import { selectNextActivePlayer } from "../actions/select-next-active-player";
import { applyDamage } from "../actions/apply-damage";
import { applyHeal } from "../actions/apply-heal";
import selectors from "../selectors";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charactersOrderedByInitiatives: null
    };
    this.onCharacterClick = this.onCharacterClick.bind(this);
  }
  componentDidMount() {
    const charactersOrderedByInitiatives = this.calculateInitiatives();
    const { setActivePlayerId, setActivePlayerIndex } = this.props;

    setActivePlayerId(charactersOrderedByInitiatives[0].id);
    setActivePlayerIndex(0);

    this.setState(() => ({
      charactersOrderedByInitiatives
    }));
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
      activePlayerId,
      attackers,
      defenders,
      applyHeal,
      applyDamage,
      selectNextActivePlayer
    } = this.props;
    const activePlayer =
      attackers.find(character => character.id === activePlayerId) ||
      defenders.find(character => character.id === activePlayerId);
    if (team === activePlayer.team) {
     
      applyHeal(id, activePlayer.attack, team);
    } else {
      applyDamage(id, activePlayer.attack, team);
    }
    selectNextActivePlayer(this.state.charactersOrderedByInitiatives);
  }

  render() {
    return <Game {...this.props} onCharacterClick={this.onCharacterClick} />;
  }
}

function mapStateToProps(state) {
  return {
    activePlayerId: state.activePlayer.id,
    activePlayerIndex: state.activePlayer.index,
    attackers: selectors.getAttackers(state),
    defenders: selectors.getDefenders(state),
    getCharacterById: selectors.getCharacterById(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActivePlayerId: id => dispatch(setActivePlayerId(id)),
    selectNextActivePlayer: charactersOrderedByInitiatives => dispatch(selectNextActivePlayer(charactersOrderedByInitiatives)),
    setActivePlayerIndex: index => dispatch(setActivePlayerIndex(index)),
    applyDamage: (id, damage, team) => dispatch(applyDamage(id, damage, team)),
    applyHeal: (id, heal, team) => dispatch(applyHeal(id, heal, team))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);
