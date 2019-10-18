import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import selectors from "../selectors";

 function Character({
  handleClick,
  health,
  currentHealth,
  order,
  id,
  team,
  type,
  active,
  activePlayerTeam
}) {
  const [isSelected, setSelectedStatus] = useState(false);
  const tileClasses = classNames("tile", `order-${order}`, {
    'cursor-sword': !active && team !== activePlayerTeam,
    'cursor-ally': team === activePlayerTeam,
  });
  const characterClasses = classNames("center", "knight", {
    active: active
  });
  const characterHiglighters = classNames("highlighter", {
    // 'attackers': active && team === 'attackers',
    // 'defenders': active && team === 'defenders',
    [team]: active,
    'enemy': !active && team !== activePlayerTeam,
    [team]: team === activePlayerTeam,
  });

  return (
    <Fragment>
      <div
        className={tileClasses}
        onClick={() => {
          handleClick(id, team);
        }}
        onMouseEnter={() => {
         setSelectedStatus(true);
        }}
        onMouseLeave={() => {
          setSelectedStatus(false);
         }}
      >
        {isSelected && (
          <div className="health">{`♥️ ${currentHealth}/${health}`}</div>
          )}
          {(active || isSelected) && ( <span className={characterHiglighters}></span>)}
        <div className={characterClasses}></div>
      </div>
    </Fragment>
  );
}

function mapStateToProps(state) {
  const getCharacterById = selectors.getCharacterById(state);
  const activePlayer = getCharacterById(state.activePlayer.id);
  const activePlayerTeam = activePlayer && activePlayer.team;
  return {
    activePlayerTeam: activePlayerTeam,
  };
}

export default connect(
  mapStateToProps,
  null
)(Character);
