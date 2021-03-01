import { useReducer } from 'react';

enum Specialty {
  None,
};

const defaultFarmhands: Farmhand[] = [
  {
    id: 0,
    specialty: Specialty.None,
    assignment: null,
  },
  {
    id: 1,
    specialty: Specialty.None,
    assignment: null,
  },
  {
    id: 2,
    specialty: Specialty.None,
    assignment: null,
  },
];


interface Farmhand {
  id: number,
  specialty: Specialty,
  assignment: React.ComponentType | null,
};

enum Actions {
  Hire,
  Fire,
};

type ActionsType =
| { type: Actions.Hire }
| { type: Actions.Fire, id: number };

function reducer(state: Farmhand[], action: ActionsType) {
  switch (action.type) {
    case Actions.Hire: {
      const nextWorker: Farmhand = {
        id: 0,
        specialty: Specialty.None,
        assignment: null,
      };

      return [ ...state, nextWorker ];
    }
    case Actions.Fire: {
      return state.filter(farmHand => farmHand.id !== action.id);
    }
    default:
      return state;
  }
}

type FarmhandsContextStore = {
  state: Farmhand[],
  hire: Function,
  fire: Function,
  hasFarmhands: Function,
};

function useFarmhands() {
  const [ state, dispatch ] = useReducer(reducer, defaultFarmhands);
  const contextStore: FarmhandsContextStore = {
    state,
    hire: () => dispatch({ type: Actions.Hire }),
    fire: (id: number) => dispatch({ type: Actions.Fire, id }),
    hasFarmhands: () => state.length > 0,
  };

  return contextStore;
}

export type { FarmhandsContextStore };
export { useFarmhands };
