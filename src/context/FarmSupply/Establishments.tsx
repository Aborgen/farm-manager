//@ts-nocheck
import { useReducer } from 'react';
import { Farmhand } from 'types/Farmhands';
import { EstablishmentProps } from 'wrappers/EstablishmentWrapper';
 
type Foo = React.RefObject<React.ComponentElement<EstablishmentProps, any>>;
type Establishment = Omit<Foo, "current"> & { current: React.ComponentElement<EstablishmentProps, any> };
const defaultState: EstablishmentState = {
  establishments: [],
};

enum Actions {
  Push,
  Assign,
};

type ActionsType =
| { type: Actions.Push, establishment: Establishment };

function reducer(state: EstablishmentState, action: ActionsType) {
  switch (action.type) {
    case Actions.Push: {
      const establishments = [ ...state.establishments, action.establishment ];
      return { ...state, establishments };
    }
    default:
      return state;
  }
}

interface EstablishmentState {
  establishments: Establishment[],
};

interface EstablishmentsContextStore {
  state: EstablishmentState,
  get: Function,
  push: Function,
  assignTo: Function,
};

function useEstablishments() {
  const [ state, dispatch ] = useReducer(reducer, defaultState);
  const contextStore: EstablishmentsContextStore = {
    state,
    get: () => state.establishments,
    push: (establishment: Establishment) => dispatch({ type: Actions.Push, establishment }),
    assignTo: (establishment: Establishment, farmhands: Farmhand) => establishment.current.props.assignTo(farmhands),
  };

  return contextStore;
}

export type { EstablishmentsContextStore, Establishment };
export { useEstablishments };
