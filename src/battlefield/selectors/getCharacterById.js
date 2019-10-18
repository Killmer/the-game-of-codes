const getCharacterById = (rootState) => (id) => {
    const character = rootState.troops.attackers.find(attacker => attacker.id === id) ||  rootState.troops.defenders.find(defender => defender.id === id)
    return character;
}

export default getCharacterById;
