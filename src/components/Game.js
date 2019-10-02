import React from "react";
import Character from "./Character";

export default function Game({ activePlayerId, onCharacterClick, attackers, defenders }) {
  return (
    <div>
      <div className="troop">
        {attackers.map(character => {
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
            />
          );
        })}
      </div>
      <hr></hr>
      <div className="troop">
        {defenders.map(character => {
          const { id, health, currentHealth, team } = character;
          return (
            <Character
              key={id}
              health={health}
              currentHealth={currentHealth}
              id={id}
              team={team}
              handleClick={onCharacterClick}
              active={activePlayerId === id}
            />
          );
        })}
      </div>
    </div>
  );
}
