import React from "react";
import Character from "./Character";
import classNames from "classnames";

export default function Battlefield({
  activePlayerId,
  onCharacterClick,
  attackers,
  defenders,
  scene
}) {
  const locationClasses = classNames("battlefield", "cave", scene);
  return (
    <div className={locationClasses}>
      <div className="troop attackers">
        {attackers.map((character, i) => {
          const { id, health, currentHealth, team, type } = character;
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
              order={i + 1}
            />
          );
        })}
      </div>
      <div className="troop defenders">
        {defenders.map((character, i) => {
          const { id, health, currentHealth, team, type } = character;
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
              order={i + 1}
            />
          );
        })}
      </div>
    </div>
  );
}
