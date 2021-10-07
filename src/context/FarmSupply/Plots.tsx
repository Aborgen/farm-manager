import { useReducer } from 'react';

import { Plot, PlotGrade } from 'types/Plots';

interface PlotState {
  plotCount: number,
  plotLimit: number,
  plots: Plot[],
};

//const demographics: Demographics = {
//  [Specialty.None]: {
//    count: 0,
//    farmhands: {}
//  },
//};

const defaultState: PlotState = {
  plotCount: 0,
  plotLimit: 15,
  plots: [],
};

enum Actions {
  Purchase,
  SetPlotLimit,
};

type ActionsType =
| { type: Actions.Purchase, grade: PlotGrade }
| { type: Actions.SetPlotLimit, limit: number };

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
    default:
      return state;
  }
}

type PlotsContextStore = {
  state: PlotState,
  purchasePlot: Function,
  setPlotLimit: Function,
  hasPlots: Function,
  atCapacity: Function,
};

function usePlots() {
  const [ state, dispatch ] = useReducer(reducer, defaultState);
  const contextStore: PlotsContextStore = {
    state,
    purchasePlot: (grade: PlotGrade) => dispatch({  type: Actions.Purchase, grade }),
    setPlotLimit: (limit: number) => dispatch({ type: Actions.SetPlotLimit, limit }),
    hasPlots: () => state.plotCount > 0,
    atCapacity: () => state.plotCount === state.plotLimit,
  };

  return contextStore;
}

export type { PlotsContextStore, Plot };
export { usePlots };
