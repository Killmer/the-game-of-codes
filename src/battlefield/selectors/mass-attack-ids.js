const getMassAttackIds = rootState => {
  const charactersOnBattlefield = [
    ...rootState.troops.attackers,
    ...rootState.troops.defenders
  ];

  return [...new Set(charactersOnBattlefield
    .filter(character => character.attackId)
    .map(character => character.attackId))];
};

export default getMassAttackIds;
