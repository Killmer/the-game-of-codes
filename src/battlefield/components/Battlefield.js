import React from "react";
import Character from "./Character";
import MassAttackAnimationContainer from "../containers/MassAttackAnimationContainer";
import classNames from "classnames";

export default function Battlefield({
  activePlayerId,
  onCharacterClick,
  showTroopsHealth,
  attackers,
  defenders,
  scene,
  cursor,
}) {
  const locationClasses = classNames(
    "battlefield",
    "cave",
    scene,
    `cursor-${cursor}`
  );
  return (
    <div className={locationClasses}>
      <MassAttackAnimationContainer>
        <div className="troop attackers">
          {attackers.map((character, i) => {
            const {
              id,
              health,
              currentHealth,
              team,
              type,
              position
            } = character;
            return (
              <Character
                key={id}
                health={health}
                currentHealth={currentHealth}
                id={id}
                team={team}
                type={type}
                handleClick={onCharacterClick}
                active={activePlayerId === id}
                position={position}
                showTroopsHealth={showTroopsHealth}
              />
            );
          })}
        </div>
        <div className="troop defenders">
          {defenders.map((character, i) => {
            const {
              id,
              health,
              currentHealth,
              team,
              type,
              position
            } = character;
            return (
              <Character
                key={id}
                health={health}
                currentHealth={currentHealth}
                id={id}
                team={team}
                type={type}
                handleClick={onCharacterClick}
                active={activePlayerId === id}
                position={position}
                showTroopsHealth={showTroopsHealth}
              />
            );
          })}
        </div>
      </MassAttackAnimationContainer>
    </div>
  );
}
