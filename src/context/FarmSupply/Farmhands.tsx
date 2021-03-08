import { useReducer } from 'react';

enum Specialty {
  None = "farmhand",
};

interface Farmhand {
  id: number,
  specialty: Specialty,
  assignment: React.RefObject<React.ReactElement> | null,
};

interface FarmhandByIdentifier {
  [id: number]: Farmhand
};

type Demographics = Record<Specialty, {
  count: number,
  farmhands: FarmhandByIdentifier,
}>;

const demographics: Demographics = {
  [Specialty.None]: {
    count: 0,
    farmhands: {}
  },
};

const defaultState: FarmhandState = {
  farmhandCount: 0,
  farmhandLimit: 20,
  demographics,
  unassigned: { count: 0 },
};

enum Actions {
  Hire,
  Fire,
};

type ActionsType =
| { type: Actions.Hire }
| { type: Actions.Fire, specialty: Specialty, id: number };

function reducer(state: FarmhandState, action: ActionsType) {
  switch (action.type) {
    case Actions.Hire: {
      console.log("HIRING", state);
      if (state.farmhandCount === state.farmhandLimit) {
        throw Error(`Tried to increment farmhands above ${state.farmhandLimit}`);
      }

      const nextWorker: Farmhand = {
        id: 0,
        specialty: Specialty.None,
        assignment: null,
      };

      const unassigned = { ...state.unassigned, [nextWorker.id]: nextWorker, count: state.unassigned.count + 1 };
      const demographics = {
        ...state.demographics,
        [Specialty.None]: {
          ...state.demographics[Specialty.None],
          farmhands: { ...state.demographics[Specialty.None].farmhands, [nextWorker.id]: nextWorker },
          count: state.demographics[Specialty.None].count + 1,
        },
      };

      return {
        ...state,
        demographics,
        unassigned,
        farmhandCount: state.farmhandCount + 1,
      };
    }
    case Actions.Fire: {
      if (state.farmhandCount === 0) {
        throw Error("Tried to decrement farmhands below 0");
      }
      else if (!(action.id in state.demographics[action.specialty])) {
        throw Error(`Tried to fire a nonexistant farmhand [${action.specialty}:${action.id}]`);
      }

      let demographics = { ...state.demographics };
      delete demographics[action.specialty].farmhands[action.id];
      return {
        ...state,
        demographics,
        farmhandCount: state.farmhandCount - 1,
      };
    }
    default:
      return state;
  }
}

interface FarmhandState {
  farmhandCount: number,
  farmhandLimit: number,
  demographics: Demographics,
  unassigned: FarmhandByIdentifier & { count: number },
};

type FarmhandsContextStore = {
  state: FarmhandState,
  hire: Function,
  fire: Function,
  hasFarmhands: Function,
  atCapacity: Function,
};

function useFarmhands() {
  const [ state, dispatch ] = useReducer(reducer, defaultState);
  const contextStore: FarmhandsContextStore = {
    state,
    hire: () => dispatch({ type: Actions.Hire }),
    fire: (specialty: Specialty, id: number) => dispatch({ type: Actions.Fire, specialty, id }),
    hasFarmhands: () => state.farmhandCount > 0,
    atCapacity: () => state.farmhandCount === state.farmhandLimit,
  };

  return contextStore;
}

export type { FarmhandsContextStore, Farmhand, FarmhandByIdentifier };
export { useFarmhands, Specialty };
