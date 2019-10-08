import React, { Fragment } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import selectors from "../selectors";
import { register } from '../animation/collection';
import keyframes from '../config/keyframes';
import animate from "../helpers/animate";

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

  }

  componentDidMount() {
    const { id } = this.props;
    register(id, this);
  }
  
  attack() {
    const { type } = this.props;
    const { attack: attackFrames } = keyframes[type];
    return animate(attackFrames, this.setState.bind(this), fps);
  }

  die() {
    const { type } = this.props;
    const { die: dieFrames } = keyframes[type];
    return animate(dieFrames, this.setState.bind(this), fps)
  }

  revive() {
    const { type } = this.props;
    const { revive: reviveFrames } = keyframes[type];
    return animate(reviveFrames, this.setState.bind(this), fps)
  }

  receiveDamage() {
    const { type } = this.props;
    const { receiveDamage: receiveDamageFrames } = keyframes[type];
    return animate(receiveDamageFrames, this.setState.bind(this), 9);
  }

  render() {
    const {
      handleClick,
      health,
      currentHealth,
      order,
      id,
      team,
      type,
      active,
      activePlayerTeam
    } = this.props;
    const { isSelected } = this.state;

    const tileClasses = classNames("tile", `order-${order}`, {
      "cursor-sword": !active && team !== activePlayerTeam,
      "cursor-ally": team === activePlayerTeam
    });
    const characterClasses = classNames("center", "knight", {
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
          className={tileClasses}
          onClick={() => {
            handleClick(id, team);
          }}
          onMouseEnter={() => {
            this.setState({ isSelected: true });
          }}
          onMouseLeave={() => {
            this.setState({ isSelected: false });
          }}
        >
          {isSelected && (
            <div className="health">{`♥️ ${currentHealth}/${health}`}</div>
          )}
          {(active || isSelected) && (
            <span
              className={characterHiglighters}
            ></span>
          )}
          <div className={characterClasses} style={animationStyles}></div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const getCharacterById = selectors.getCharacterById(state);
  const activePlayer = getCharacterById(state.activePlayer.id);
  const activePlayerTeam = activePlayer && activePlayer.team;
  return {
    activePlayerTeam: activePlayerTeam
  };
}

export default connect(
  mapStateToProps,
  null
)(Character);
