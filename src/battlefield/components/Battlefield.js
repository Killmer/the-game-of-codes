import React from "react";
import Character from "./Character";
import MassAttackAnimationContainer from "../containers/MassAttackAnimationContainer";
import classNames from "classnames";
import selectors from "../selectors";

export default function Battlefield({
  activePlayerId,
  onCharacterClick,
  showTroopsHealth,
  attackers,
  defenders,
  scene,
  cursor,
  activePlayer,
  targetHero
}) {
  const activePlayerType = selectors;
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
      <div className="ui">
        <div className="left">
          <span className={`hero-img attacker ${activePlayer && activePlayer.type}`}></span>
          <div className="stats float-right">
            Health: ♥️ 
            <span className="health__numbers"> {activePlayer && activePlayer.currentHealth} / {activePlayer && activePlayer.health}</span>
            <div className="health__numbers">
              Damage: {activePlayer && activePlayer.attack}
            </div>
            <div className="health__numbers">
              Attack type: {activePlayer && activePlayer.attackType}
            </div>
            <div className="health__numbers">
              Initiative: {activePlayer && activePlayer.initiative}
            </div>
          </div>
        </div>
        <div className="right">
          <span className={`hero-img defender ${(targetHero && targetHero.type) || ""}`}></span>
          <div className="stats float-left">
            Health: ♥️{" "}
            <span className="health__numbers">
              {(targetHero && targetHero.currentHealth) || '0'} / {(targetHero && targetHero.health) || '0'}
            </span>
            <div className="health__numbers">
              Damage: {(targetHero && targetHero.attack) || '0'}
            </div>
            <div className="health__numbers">
              Attack type: {targetHero && targetHero.attackType}
            </div>
            <div className="health__numbers">
              Initiative: {targetHero && targetHero.initiative}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
