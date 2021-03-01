import { createContext, useContext } from 'react';

import { useSeeds, SeedsContextStore } from './Seeds';

const FarmSupply = createContext({});

type FarmSupplyContextStore = {
  seeds: SeedsContextStore,
};

function FarmSupplyProvider(props: { children: React.ReactNode }) {
  const contextStore: FarmSupplyContextStore = {
    seeds: useSeeds(),
  };

  return <FarmSupply.Provider value={ contextStore }>{ props.children }</FarmSupply.Provider>;
}

const useFarmSupplyContext = () => useContext(FarmSupply) as FarmSupplyContextStore;
export { FarmSupply, useFarmSupplyContext, FarmSupplyProvider };
