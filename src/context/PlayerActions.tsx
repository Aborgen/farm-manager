import { createContext, useReducer, useContext } from 'react';

const PlayerActions = createContext({});

interface PlayerState {
  name: string,
  focus: React.RefObject<React.ReactElement> | null,
};

const defaultPlayerState: PlayerState = {
  name: "Farmer Joe",
  focus: null,
};

enum Actions {
  SetFocus,
  ClearFocus,
};

type ActionType =
| { type: Actions.SetFocus, target: React.RefObject<React.ReactElement> }
| { type: Actions.ClearFocus };

function reducer(state: PlayerState, action: ActionType) {
  switch(action.type) {
    case Actions.SetFocus: {
      if (state.focus === action.target) {
        return state;
      }

      const focus = action.target;
      return { ...state, focus };
    }
    case Actions.ClearFocus: {
      if ( state.focus === null ) {
        return state;
      }

      return { ...state, focus: null };
    }
    default:
      return state;
  }
}

type PlayerActionsContextStore = {
  state: PlayerState,
  setFocus: Function,
  clearFocus: Function,
};

function PlayerActionsProvider(props: { children: React.ReactElement }) {
  const [ state, dispatch ] = useReducer(reducer, defaultPlayerState);
  const contextStore = {
    state,
    setFocus: (element: React.RefObject<React.ReactElement>) => dispatch({ type: Actions.SetFocus, target: element }),
    clearFocus: () => dispatch({ type: Actions.ClearFocus }),
  };

  return <PlayerActions.Provider value = { contextStore }>{ props.children }</PlayerActions.Provider>;
}

const usePlayerActionsContext = () => useContext(PlayerActions) as PlayerActionsContextStore;
export { PlayerActions, usePlayerActionsContext, PlayerActionsProvider };
