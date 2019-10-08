import React from "react";
import { connect } from "react-redux";
import Battlefield from "../components/Battlefield";
import { setActivePlayerId } from "../actions/set-active-player-id";
import { setActivePlayerIndex } from "../actions/set-active-player-index";
import { selectNextActivePlayer } from "../actions/select-next-active-player";
import { attack } from "../actions/attack";
import { support } from "../actions/support";
import selectors from "../selectors";
import checkMeleeAttackConstraints from '../helpers/check-melee-attack-constraints';

class BattlefieldContainer extends React.Component {
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
      support,
      attack,
      selectNextActivePlayer,
      getCharacterById
    } = this.props;
    const activePlayer =
      attackers.find(character => character.id === activePlayerId) ||
      defenders.find(character => character.id === activePlayerId);
    if (team === activePlayer.team) {
      support(id, team);
    } else {
      const targetHero = getCharacterById(id);
      if (targetHero.currentHealth <= 0) return;

      if (activePlayer.attackType === "melee" && !checkMeleeAttackConstraints({
        attackers,
        defenders,
        targetHero,
        activePlayer
      })) {
        return;
      } 

      attack(id, team);
    }

    selectNextActivePlayer(this.state.charactersOrderedByInitiatives);
  }

  render() {
    return (
      <Battlefield {...this.props} onCharacterClick={this.onCharacterClick} />
    );
  }
}

function mapStateToProps(state) {
  return {
    activePlayerId: state.activePlayer.id,
    activePlayerIndex: state.activePlayer.index,
    attackers: selectors.getAttackers(state),
    defenders: selectors.getDefenders(state),
    getCharacterById: selectors.getCharacterById(state),
    cursor: state.ui.cursor,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActivePlayerId: id => dispatch(setActivePlayerId(id)),
    selectNextActivePlayer: charactersOrderedByInitiatives =>
      dispatch(selectNextActivePlayer(charactersOrderedByInitiatives)),
    setActivePlayerIndex: index => dispatch(setActivePlayerIndex(index)),
    support: (id, team) => dispatch(support(id, team)),
    attack: (id, team) => dispatch(attack(id, team))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BattlefieldContainer);
