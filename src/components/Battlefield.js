import React from "react";
import Character from "./Character";
import classNames from "classnames";

export default function Battlefield({
  activePlayerId,
  onCharacterClick,
  attackers,
  defenders,
  scene,
  cursor
}) {
  const locationClasses = classNames("battlefield", "cave", scene, `cursor-${cursor}`);
  return (
    <div className={locationClasses}>
      <div className="troop attackers">
        {attackers.map((character, i) => {
          const { id, health, currentHealth, team, type, position } = character;
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
            />
          );
        })}
      </div>
      <div className="troop defenders">
        {defenders.map((character, i) => {
          const { id, health, currentHealth, team, type, position } = character;
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
            />
          );
        })}
      </div>
    </div>
  );
}
