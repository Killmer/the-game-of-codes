import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import massAttackAnimationComponents from "../components/mass-attacks";
import selectors from "../selectors";

class MassAttackAnimationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, activePlayerTeam, massAttackIds } = this.props;
    const massAttackClasses = classNames("mass-attack-animation-container", {
      left: activePlayerTeam === "defenders",
      right: activePlayerTeam === "attackers"
    });

    return (
      <div className={massAttackClasses}>
        {massAttackIds.map((id, index) => {
          const Component = massAttackAnimationComponents[id];
          return <Component key={`${index}-${id}`}/>;
        })}
        {children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const activePlayer = selectors.getCharacterById(state)(state.activePlayer.id);
  return {
    activePlayerTeam: activePlayer && activePlayer.team,
    massAttackIds: selectors.getMassAttackIds(state)
  };
}

export default connect(
  mapStateToProps,
  null
)(MassAttackAnimationContainer);
