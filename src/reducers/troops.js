import actionTypes from "../constants/action-types";

const DEFAULT_TROOPS = [
  {
    team: "attackers",
    type: "knight",
    attack: '10-15',
    attackType: 'melee',
    position: 1,
    health: 50,
    currentHealth: 50,
    id: 1,
    initiative: 5,
  },
  {
    team: "attackers",
    type: "knight",
    attack: '8-10',
    attackType: 'melee',
    position: 2,
    health: 60,
    currentHealth: 60,
    id: 2,
    initiative: 2,
  },
  {
    team: "attackers",
    type: "knight",
    attack: '15-22',
    attackType: 'melee',
    position: 3,
    health: 100,
    currentHealth: 100,
    id: 3,
    initiative: 3,
  },
  {
    team: "attackers",
    type: "knight",
    attack: '5-10',
    attackType: 'massive',
    position: 4,
    health: 30,
    currentHealth: 30,
    id: 4,
    initiative: 1,
  },
  {
    team: "attackers",
    type: "knight",
    attack: '5-7',
    attackType: 'single',
    position: 5,
    health: 30,
    currentHealth: 30,
    id: 5,
    initiative: 3,
  },
  {
    team: "attackers",
    type: "knight",
    attack: '5-7',
    attackType: 'single',
    position: 6,
    health: 40,
    currentHealth: 40,
    id: 6,
    initiative: 3,
  }
];
const DEFAULT_STATE = {
  attackers: DEFAULT_TROOPS,
  defenders: DEFAULT_TROOPS.map(troop => ({ ...troop, team: "defenders", id: troop.id + 'a' }))
};

const troops = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actionTypes.APPLY_DAMAGE:
      {
      const targetTeam = action.payload.team;
      return {
        ...state,
        [targetTeam]: troopsReducer(state[targetTeam], action)
      };
    }
    case actionTypes.APPLY_HEAL: {
      const targetTeam = action.payload.team;
      return {
        ...state,
        [targetTeam]: troopsReducer(state[targetTeam], action)
      };
    }
    default:
      return state;
  }
};

const troopsReducer = (state = DEFAULT_TROOPS, action) => {
  switch (action.type) {
    case actionTypes.APPLY_DAMAGE:
      return state.map(character => characterReducer(character, action));

    case actionTypes.APPLY_HEAL:
      return state.map(character => characterReducer(character, action));
    default:
      return state;
  }
};

const characterReducer = (characterState = {}, action) => {
  switch (action.type) {
    case actionTypes.APPLY_DAMAGE: {
      const damage = action.payload.damage;
      const targetId = action.payload.id;

      if (characterState.id !== targetId) return characterState;
      return {
        ...characterState,
        currentHealth: characterState.currentHealth - damage
      };
    }

    case actionTypes.APPLY_HEAL: {
      const heal = action.payload.heal;
      const memberId = action.payload.id;

      if (characterState.id !== memberId) return characterState;
      return {
        ...characterState,
        currentHealth: characterState.currentHealth + heal
      };
    }
    default:
      return characterState;
  }
};

export default troops;
