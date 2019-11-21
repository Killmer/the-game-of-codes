import React, { Fragment } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import selectors from "../selectors";
import { register } from "../../animation/collection";
import { set } from "../../config/character-nodes-reference";
import keyframes from "../../config/keyframes";
import animate from "../helpers/animate";
import toCamelCase from "../helpers/to-camel-case";
import { setHoveredElement } from "../actions/set-hovered-element";
import sounds from "../../sounds";


const registerCharacterRef = set;
const fps = 20;

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };

    this.receiveDamage = this.receiveDamage.bind(this);
    this.attack = this.attack.bind(this);
    this.die = this.die.bind(this);
    this.revive = this.revive.bind(this);
    this.attackSound = React.createRef();
    this.dieSound = React.createRef();
    this.receiveDamageSound = React.createRef();
    this.characterRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props;
    register(id, this);
    registerCharacterRef(id, this.characterRef.current);
  }

  attack() {
    const { type } = this.props;
    const { attack: attackFrames } = keyframes[toCamelCase(type)];
    this.attackSound.current.play();
    return animate(attackFrames, this.setState.bind(this), fps);
  }

  die() {
    const { type } = this.props;
    const { die: dieFrames } = keyframes[toCamelCase(type)];
    this.dieSound.current.play();
    return animate(dieFrames, this.setState.bind(this), fps);
  }

  revive() {
    const { type } = this.props;
    const { revive: reviveFrames } = keyframes[toCamelCase(type)];
    return animate(reviveFrames, this.setState.bind(this), fps);
  }

  receiveDamage() {
    const { type } = this.props;
    const { receiveDamage: receiveDamageFrames } = keyframes[toCamelCase(type)];
    this.receiveDamageSound.current.play();
    return animate(receiveDamageFrames, this.setState.bind(this), 9);
  }

  render() {
    const {
      handleClick,
      health,
      currentHealth,
      position,
      id,
      team,
      type,
      active,
      activePlayerTeam,
      setHoveredElement,
      showTroopsHealth,
      isBattleFieldDisabled
    } = this.props;
    const { isSelected } = this.state;

    const tileClasses = classNames("tile", `order-${position}`);
    const characterClasses = classNames("center", type, {
      active: active
    });
    const characterHiglighters = classNames("highlighter", {
      [team]: active,
      enemy: !active && team !== activePlayerTeam,
      [team]: team === activePlayerTeam
    });

    const { x, y, width, height } = this.state;
    const animationStyles = {
      width,
      height,
      backgroundPosition: `${x}px ${y}px`
    };

    return (
      <Fragment>
        <div
          ref={this.characterRef}
          className={tileClasses}
          onClick={() => {
            handleClick(id, team);
          }}
          onMouseEnter={() => {
            this.setState({ isSelected: true });
            if (!isBattleFieldDisabled) {
              setHoveredElement({ id, type: "character" });
            }
          }}
          onMouseLeave={() => {
            this.setState({ isSelected: false });
            if (!isBattleFieldDisabled) {
              setHoveredElement(null);
            }
          }}
        >
          {(showTroopsHealth || isSelected) && (
            <div className="health">
              ♥️
              <span className="health__numbers">
                {" "}
                {currentHealth} / {health}
              </span>
            </div>
          )}
          {(active || isSelected) && (
            <span className={characterHiglighters}></span>
          )}
          <div className={characterClasses} style={animationStyles}></div>
        </div>
        <audio
          ref={this.attackSound}
          src={sounds[toCamelCase(type)] && sounds[toCamelCase(type)].attack}
        ></audio>
        <audio
          ref={this.dieSound}
          src={sounds[toCamelCase(type)] && sounds[toCamelCase(type)].die}
        ></audio>
        <audio
          ref={this.receiveDamageSound}
          src={
            sounds[toCamelCase(type)] && sounds[toCamelCase(type)].receiveDamage
          }
        ></audio>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const getCharacterById = selectors.getCharacterById(state);
  const activePlayer = getCharacterById(state.activePlayer.id);
  const activePlayerTeam = activePlayer && activePlayer.team;
  return {
    activePlayerTeam: activePlayerTeam,
    isBattleFieldDisabled: selectors.getBattleFieldStatus(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setHoveredElement: element => dispatch(setHoveredElement(element))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Character);
