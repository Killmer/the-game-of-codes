import actionTypes from "../constants/action-types";

const DEFAULT_TROOPS = [
  {
    team: 'attackers',
    type: "knight",
    attack: 10,
    health: 50,
    currentHealth: 50,
    id: 1
  },
  {
    team: 'attackers',
    type: "knight",
    attack: 10,
    health: 50,
    currentHealth: 50,
    id: 2
  },
  {
    team: 'attackers',
    type: "king",
    attack: 20,
    health: 100,
    currentHealth: 100,
    id: 3
  },
  {
    team: 'attackers',
    type: "archer",
    attack: 5,
    health: 30,
    currentHealth: 30,
    id: 4
  },
  {
    team: 'attackers',
    type: "archer",
    attack: 5,
    health: 30,
    currentHealth: 30,
    id: 5
  },
  {
    team: 'attackers',
    type: "archer",
    attack: 5,
    health: 30,
    currentHealth: 30,
    id: 6
  }
];
const DEFAULT_STATE = {
  attackers: DEFAULT_TROOPS,
  defenders: DEFAULT_TROOPS.map(troop => ({...troop, team: 'defenders'}))
};

const troops = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actionTypes.APPLY_DAMAGE:
      const targetTeam = action.payload.team; 
      return {
        ...state,
        [targetTeam]: troopsReducer(state[targetTeam], action),
      }
    default:
      return state;
  }
};

const troopsReducer = (state = DEFAULT_TROOPS, action) => {
  switch (action.type) {
    case actionTypes.APPLY_DAMAGE:
      return state.map(character => characterReducer(character, action));
    default:
      return state;
  }
};

const characterReducer = (characterState = {}, action) => {
  switch (action.type) {
    case actionTypes.APPLY_DAMAGE:
      const damage = action.payload.damage;
      const targetId = action.payload.id;

      if (characterState.id !== targetId) return characterState;
      return {
        ...characterState,
        currentHealth: characterState.currentHealth - damage
      };
    default:
      return characterState;
  }
};

export default troops;
