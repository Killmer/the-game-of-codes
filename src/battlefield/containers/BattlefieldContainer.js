import React from "react";
import { connect } from "react-redux";
import Battlefield from "../components/Battlefield";
import actions from "../actions";
import selectors from "../selectors";
import checkMeleeAttackConstraints from "../helpers/check-melee-attack-constraints";

class BattlefieldContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTroopsHealth: false
    };
    this.onCharacterClick = this.onCharacterClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggleShowTroopsHealthStatus = this.toggleShowTroopsHealthStatus.bind(
      this
    );
  }
  componentDidMount() {
    const charactersOrderedByInitiatives = this.calculateInitiatives();
    const {
      setActivePlayerId,
      setActivePlayerIndex,
      setInitiatives
    } = this.props;

    setActivePlayerId(charactersOrderedByInitiatives[0].id);
    setActivePlayerIndex(0);

    setInitiatives(charactersOrderedByInitiatives);

    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
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
      getCharacterById,
      setBattlefieldStatus,
      isDisabled
    } = this.props;

    console.log('isDisabled', isDisabled)

    if (isDisabled) return;


    const activePlayer =
      attackers.find(character => character.id === activePlayerId) ||
      defenders.find(character => character.id === activePlayerId);
    if (team === activePlayer.team) {
      // TODO: enable support only for priests
      return;
      support(id, team);
    } else {
      const targetHero = getCharacterById(id);
      if (targetHero.currentHealth <= 0) return;
      if (
        activePlayer.attackType === "melee" &&
        !checkMeleeAttackConstraints({
          attackers,
          defenders,
          targetHero,
          activePlayer
        })
      ) {
        return;
      }

      setBattlefieldStatus(true);
      attack(id, team);
    }
  }

  toggleShowTroopsHealthStatus() {
    this.setState(state => {
      return {
        showTroopsHealth: !state.showTroopsHealth
      };
    });
  }

  handleKeyPress(event) {
    if (event.code === "ShiftLeft") {
      this.toggleShowTroopsHealthStatus();
    }
  }

  render() {
    const {
      activePlayerId,
      attackers,
      defenders,
      getCharacterById,
      hoveredElement
    } = this.props;

    const activePlayer = attackers.find(character => character.id === activePlayerId) ||
    defenders.find(character => character.id === activePlayerId);
    const targetHeroId = hoveredElement && hoveredElement.id;
    const targetHero = getCharacterById(targetHeroId);

    return (
      <Battlefield
        {...this.props}
        onCharacterClick={this.onCharacterClick}
        showTroopsHealth={this.state.showTroopsHealth}
        activePlayer={activePlayer}
        targetHero={targetHero}
      />
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
    isDisabled: selectors.getBattleFieldStatus(state),
    hoveredElement: selectors.getHoveredElement(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setBattlefieldStatus: (status) => dispatch(actions.setBattlefieldStatus(status)),
    setActivePlayerId: id => dispatch(actions.setActivePlayerId(id)),
    setActivePlayerIndex: index => dispatch(actions.setActivePlayerIndex(index)),
    support: (id, team) => dispatch(actions.support(id, team)),
    attack: (id, team) => dispatch(actions.attack(id, team)),
    setInitiatives: initiatives => dispatch(actions.setInitiatives(initiatives)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BattlefieldContainer);
