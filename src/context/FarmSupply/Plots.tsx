import { useReducer } from 'react';

import { Plot, PlotGrade } from 'types/Plots';

interface PlotState {
  plotCount: number,
  plotLimit: number,
  plots: Plot[],
};

const defaultState: PlotState = {
  plotCount: 0,
  plotLimit: 15,
  plots: [],
};

enum Actions {
  Purchase,
  SetPlotLimit,
  SetName,
};

type ActionsType =
| { type: Actions.Purchase, grade: PlotGrade }
| { type: Actions.SetPlotLimit, limit: number }
| { type: Actions.SetName, idx: number, name: string };

function reducer(state: PlotState, action: ActionsType) {
  switch (action.type) {
    case Actions.Purchase: {
      if (state.plotCount === state.plotLimit) {
        throw Error(`Tried to increment plots above ${state.plotLimit}`);
      }

      const index = state.plots.length === 0 ? 0 : state.plots[state.plots.length-1].index + 1;
      const nextPlot: Plot = {
        grade: action.grade,
        index,
        name: `Plot${index + 1}`,
      };

      return {
        ...state,
        plots: [...state.plots, nextPlot],
        plotCount: state.plotCount + 1,
      };
    }
   case Actions.SetPlotLimit: {
      if (action.limit < state.plotCount) {
        throw Error(`Tried to set plotLimit to ${action.limit}, which is less than current plot count ${state.plotCount}`)
      }
      return {
        ...state,
        plotLimit: action.limit,
      };
    }
    case Actions.SetName: {
      if (state.plots.length === 0) {
        return state;
      }

      const nextPlots = state.plots.slice();
      nextPlots[action.idx].name = action.name.slice(0, 15);
      return {
        ...state,
        plots: nextPlots,
      };
    }
    default:
      return state;
  }
}

type PlotsContextStore = {
  state: PlotState,
  purchasePlot: Function,
  setPlotLimit: Function,
  setName: Function,
  hasPlots: Function,
  atCapacity: Function,
};

function usePlots() {
  const [ state, dispatch ] = useReducer(reducer, defaultState);
  const contextStore: PlotsContextStore = {
    state,
    purchasePlot: (grade: PlotGrade) => dispatch({  type: Actions.Purchase, grade }),
    setPlotLimit: (limit: number) => dispatch({ type: Actions.SetPlotLimit, limit }),
    setName: (idx: number, name: string) => dispatch({ type: Actions.SetName, idx, name }),
    hasPlots: () => state.plotCount > 0,
    atCapacity: () => state.plotCount === state.plotLimit,
  };

  return contextStore;
}

export type { PlotsContextStore, Plot };
export { usePlots };
