import { createContext, useContext } from 'react';

import { useSeeds, SeedsContextStore } from './Seeds';
import { useFarmhands, FarmhandsContextStore } from './Farmhands';

const FarmSupply = createContext({});

type FarmSupplyContextStore = {
  seeds: SeedsContextStore,
  farmhands: FarmhandsContextStore,
};

function FarmSupplyProvider(props: { children: React.ReactNode }) {
  const contextStore: FarmSupplyContextStore = {
    seeds: useSeeds(),
    farmhands: useFarmhands(),
  };

  return <FarmSupply.Provider value={ contextStore }>{ props.children }</FarmSupply.Provider>;
}

const useFarmSupplyContext = () => useContext(FarmSupply) as FarmSupplyContextStore;
export { FarmSupply, useFarmSupplyContext, FarmSupplyProvider };
