import React from "react";
import Character from "./Character";

export default function Game({ applyDamage, attackers, defenders }) {
  return (
    <div>
      <div className="troop">
        {attackers.map(character => {
          const { id, health, currentHealth, team } = character;
          return (
            <Character
              key={id}
              health={health}
              currentHealth={currentHealth}
              id={id}
              team={team}
              handleClick={applyDamage}
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
              handleClick={applyDamage}
            />
          );
        })}
      </div>
    </div>
  );
}
