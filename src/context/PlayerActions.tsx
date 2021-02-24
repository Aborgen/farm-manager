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
  Focus,
};

type ActionType =
| { type: Actions.Focus, target: React.RefObject<React.ReactElement> };

function reducer(state: PlayerState, action: ActionType) {
  switch(action.type) {
    case Actions.Focus: {
      if (state.focus === action.target) {
        return state;
      }

      const focus = action.target;
      return { ...state, focus };
    }
    default:
      return state;
  }
}

type PlayerActionsContextStore = {
  state: PlayerState,
  dispatch: Function,
  setFocus: Function,
};

function PlayerActionsProvider(props: { children: React.ReactElement }) {
  const [ state, dispatch ] = useReducer(reducer, defaultPlayerState);
  const contextStore = {
    state,
    dispatch,
    setFocus: (element: React.RefObject<React.ReactElement>) => dispatch({ type: Actions.Focus, target: element }),
  };

  return <PlayerActions.Provider value = { contextStore }>{ props.children }</PlayerActions.Provider>;
}

const usePlayerActionsContext = () => useContext(PlayerActions) as PlayerActionsContextStore;
export { PlayerActions, usePlayerActionsContext, PlayerActionsProvider };
