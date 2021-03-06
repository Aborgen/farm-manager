import { useReducer } from 'react';

import { Crop, SeedStorage } from 'types/Crops';
import { Cart } from 'types/Shop';

const defaultSeeds: SeedStorage = {
  [Crop.Carrot]: { count: 5, max: 20, price: 100, },
  [Crop.Corn]:   { count: 5, max: 20, price: 65, },
  [Crop.Celery]: { count: 5, max: 20, price: 50, },
};

enum SeedsActions {
  Set,
  SetMax,
  Dec,
  Inc,
  Buy,
};

type SeedsActionsType =
| { type: SeedsActions.Set, crop: Crop, count: number }
| { type: SeedsActions.SetMax, crop: Crop, max: number }
| { type: SeedsActions.Dec, crop: Crop }
| { type: SeedsActions.Inc, crop: Crop }
| { type: SeedsActions.Buy, cart: Cart };

function seedStoreReducer(seedStore: SeedStorage, action: SeedsActionsType) {
  switch (action.type) {
    case SeedsActions.Set: {
      const { crop } = action;
      if (action.count > seedStore[crop].max) {
        throw Error(`Tried to set ${crop} seeds to ${action.count}, above ${seedStore[crop].max}(max)`);
      }
      else if (action.count < 0) {
        throw Error(`Tried to set ${crop} seeds to ${action.count}, below 0`);
      }

      const seeds = {
        ...seedStore[crop],
        count: action.count,
      };

      return { ...seedStore, [crop]: seeds };
    }
    case SeedsActions.SetMax: {
      const { crop } = action;
      if (action.max < 0) {
        throw Error(`Tried to set ${crop} seed capacity to ${action.max}, less than 0`);
      }

      const seeds = {
        ...seedStore[crop],
        count: Math.min(seedStore[crop].count, action.max),
        max: action.max,
      };

      return { ...seedStore, [crop]: seeds };
    }
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
    case SeedsActions.Buy: {
      return Object
        .entries(action.cart)
        .reduce((accumulator: SeedStorage, [temp, bundle]) => {
          const crop = temp as Crop;
          if (seedStore[crop].max - seedStore[crop].count < bundle.quantity) {
            throw Error(`Tried to buy ${bundle.quantity} more ${crop} seeds, when at ${seedStore[crop].count}/${seedStore[crop].max}`);
          }

          accumulator[crop] = {
            ...seedStore[crop],
            count: seedStore[crop].count + bundle.quantity,
          }

          return accumulator;
        }, {...seedStore} as SeedStorage);
    }
    default:
      return seedStore;
  }
}

type SeedsContextStore = {
  state: SeedStorage,
  setSeeds: Function,
  getSeeds: Function,
  setMax: Function,
  getMax: Function,
  getAvailableSpace: Function,
  decSeeds: Function,
  incSeeds: Function,
  buySeeds: Function,
  hasSeeds: Function,
  atCapacity: Function,
  priceCheck: Function,
};

function useSeeds() {
  const [ state, dispatch ] = useReducer(seedStoreReducer, defaultSeeds);
  const contextStore: SeedsContextStore = {
    state,
    setSeeds: (crop: Crop, count: number) => dispatch({ type: SeedsActions.Set, crop, count }),
    getSeeds: (crop: Crop) => state[crop].count,
    setMax: (crop: Crop, max: number) => dispatch({ type: SeedsActions.SetMax, crop, max }),
    getMax: (crop: Crop) => state[crop].max,
    getAvailableSpace: (crop: Crop) => state[crop].max - state[crop].count,
    decSeeds: (crop: Crop) => dispatch({ type: SeedsActions.Dec, crop }),
    incSeeds: (crop: Crop) => dispatch({ type: SeedsActions.Inc, crop }),
    buySeeds: (cart: Cart) => dispatch({ type: SeedsActions.Buy, cart }),
    hasSeeds: (crop: Crop) => state[crop].count > 0,
    atCapacity: (crop: Crop) => state[crop].count === state[crop].max,
    priceCheck: (crop: Crop) => state[crop].price,
  };

  return contextStore;
}

export type { SeedsContextStore };
export { useSeeds };
