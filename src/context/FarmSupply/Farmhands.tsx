import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Demographics, Farmhand, FarmhandByIdentifier, Specialty } from 'types/Farmhands';

interface FarmhandState {
  farmhandCount: number,
  farmhandLimit: number,
  demographics: Demographics,
  unassigned: Farmhand[],
};

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
  unassigned: [],
};

enum Actions {
  Hire,
  Fire,
  SetFarmhandLimit,
  OverwriteUnassigned,
};

type ActionsType =
| { type: Actions.Hire }
| { type: Actions.Fire, specialty: Specialty, id: string }
| { type: Actions.SetFarmhandLimit, limit: number }
| { type: Actions.OverwriteUnassigned, unassigned: Farmhand[] };

function reducer(state: FarmhandState, action: ActionsType) {
  switch (action.type) {
    case Actions.Hire: {
      if (state.farmhandCount === state.farmhandLimit) {
        throw Error(`Tried to increment farmhands above ${state.farmhandLimit}`);
      }

      const nextWorker: Farmhand = {
        id: uuidv4(),
        specialty: Specialty.None,
        assignment: null,
      };
      const unassigned = [ ...state.unassigned, nextWorker ];
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
      else if (!(action.id in state.demographics[action.specialty].farmhands)) {
        throw Error(`Tried to fire a nonexistant farmhand [${action.specialty}:${action.id}]`);
      }

      // 1) Delete farmhand from pool of farmhands.
      let demographics = { ...state.demographics };
      const farmhand = demographics[action.specialty].farmhands[action.id];
      delete demographics[action.specialty].farmhands[action.id];
      // 2) If farmhand is unassigned, remove from state.unassigned array. Else, invoke dismiss method of assigned Establishment. React will probably be upset about this...
      let unassigned = state.unassigned;
      if (farmhand.assignment === null) {
        unassigned = unassigned.filter((fh => fh.id !== action.id));
      }
      else {
        if (farmhand.assignment.current === null) {
          throw Error(`Farmhand's assignment ref is not null, but the current property is null ${farmhand}`);
        }

        farmhand.assignment.current.props.dismiss(action.id);
      }

      return {
        ...state,
        demographics,
        unassigned,
        farmhandCount: state.farmhandCount - 1,
      };
    }
    case Actions.SetFarmhandLimit: {
      if (action.limit < state.farmhandCount) {
        throw Error(`Tried to set farmhandLimit to ${action.limit}, which is less than current farmhand count ${state.farmhandCount}`)
      }
      return {
        ...state,
        farmhandLimit: action.limit,
      };
    }
    case Actions.OverwriteUnassigned: {
      return {
        ...state,
        unassigned: action.unassigned,
      };
    }
    default:
      return state;
  }
}

type FarmhandsContextStore = {
  state: FarmhandState,
  hire: Function,
  fire: Function,
  setFarmhandLimit: Function,
  hasFarmhands: Function,
  atCapacity: Function,
  overwriteUnassigned: Function,
};

function useFarmhands() {
  const [ state, dispatch ] = useReducer(reducer, defaultState);
  const contextStore: FarmhandsContextStore = {
    state,
    hire: () => dispatch({ type: Actions.Hire }),
    fire: (specialty: Specialty, id: string) => dispatch({ type: Actions.Fire, specialty, id }),
    setFarmhandLimit: (limit: number) => dispatch({ type: Actions.SetFarmhandLimit, limit }),
    hasFarmhands: () => state.farmhandCount > 0,
    atCapacity: () => state.farmhandCount === state.farmhandLimit,
    overwriteUnassigned: (unassigned: Farmhand[]) => dispatch({ type: Actions.OverwriteUnassigned, unassigned }),
  };

  return contextStore;
}

export type { FarmhandsContextStore, Farmhand, FarmhandByIdentifier };
export { useFarmhands, Specialty };
