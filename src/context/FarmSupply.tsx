import { createContext, useReducer, useContext } from 'react';

import { Crop, SeedStorage } from 'types/Crops';

const FarmSupply = createContext({});
const defaultSeeds: SeedStorage = {
  [Crop.Carrot]: { count: 5, max: 20 },
  [Crop.Corn]:   { count: 5, max: 20 },
  [Crop.Celery]: { count: 5, max: 20 },
};

enum SeedsActions {
  Dec,
  Inc,
};

type SeedsActionsType =
| { type: SeedsActions.Dec, crop: Crop }
| { type: SeedsActions.Inc, crop: Crop };
function seedStoreReducer(seedStore: SeedStorage, action: SeedsActionsType) {
  switch (action.type) {
    case SeedsActions.Dec: {
      const { crop } = action;
      if (seedStore[crop].count === 0) {
        throw Error(`Tried to decrement ${crop} seeds below 0`);
      }

      const seeds = {
        ...seedStore[crop],
        count: seedStore[crop].count - 1
      };

      return { ...seedStore, [crop]: seeds };
    }
    case SeedsActions.Inc: {
      const { crop } = action;
      if (seedStore[crop].count === seedStore[crop].max) {
        throw Error(`Tried to increment ${crop} seeds above ${seedStore[crop].max}(max)`);
      }

      const seeds = {
        ...seedStore[crop],
        count: seedStore[crop].count + 1
      };

      return { ...seedStore, [crop]: seeds };
    }
    default:
      return seedStore;
  }
}

type SeedsContextStore = {
  state: SeedStorage,
  decSeeds: Function,
  incSeeds: Function,
  hasSeeds: Function,
};
function useSeeds(defaultSeeds: SeedStorage) {
  const [ state, dispatch ] = useReducer(seedStoreReducer, defaultSeeds);
  const contextStore = {
    state,
    decSeeds: (crop: Crop) => dispatch({ type: SeedsActions.Dec, crop }),
    incSeeds: (crop: Crop) => dispatch({ type: SeedsActions.Inc, crop }),
    hasSeeds: (crop: Crop) => state[crop].count > 0,
  };

  return contextStore;
}

type FarmSupplyContextStore = {
  seeds: SeedsContextStore,
};
function FarmSupplyProvider(props: { children: React.ReactNode }) {
  const contextStore: FarmSupplyContextStore = {
    seeds: useSeeds(defaultSeeds),
  };

  return <FarmSupply.Provider value={ contextStore }>{ props.children }</FarmSupply.Provider>;
}

const useFarmSupplyContext = () => useContext(FarmSupply) as FarmSupplyContextStore;
export { FarmSupply, useFarmSupplyContext, FarmSupplyProvider };
