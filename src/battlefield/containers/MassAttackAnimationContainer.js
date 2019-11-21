import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import massAttackAnimationComponents from "../components/mass-attacks";
import selectors from "../selectors";

class MassAttackAnimationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.massAnimationContainer = React.createRef();
  }

  render() {
    const { children, activePlayerTeam, activePlayerId, selectedPlayerId, massAttackIds } = this.props;
    const massAttackClasses = classNames("mass-attack-animation-container", {
      left: activePlayerTeam === "defenders",
      right: activePlayerTeam === "attackers"
    });

    return (
      <div className={massAttackClasses} ref={this.massAnimationContainer}>
        {massAttackIds.map((id, index) => {
          const Component = massAttackAnimationComponents[id];
          return (
            <Component
              key={`${index}-${id}`}
              massAnimationContainerNode={this.massAnimationContainer.current}
              activePlayerId={activePlayerId}
              selectedPlayerId={selectedPlayerId}
            />
          );
        })}
        {children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const activePlayer = selectors.getCharacterById(state)(state.activePlayer.id);
  const hoveredElement = selectors.getHoveredElement(state);
  return {
    activePlayerTeam: activePlayer && activePlayer.team,
    activePlayerId: activePlayer && activePlayer.id,
    selectedPlayerId: hoveredElement && hoveredElement.id,
    massAttackIds: selectors.getMassAttackIds(state)
  };
}

export default connect(mapStateToProps, null)(MassAttackAnimationContainer);
