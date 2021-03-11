import { createContext, useContext } from 'react';

import { useSeeds, SeedsContextStore } from './Seeds';
import { useFarmhands, FarmhandsContextStore } from './Farmhands';
import { useEstablishments, EstablishmentsContextStore } from './Establishments';

const FarmSupply = createContext({});

type FarmSupplyContextStore = {
  seeds: SeedsContextStore,
  farmhands: FarmhandsContextStore,
  establishments: EstablishmentsContextStore,
};

function FarmSupplyProvider(props: { children: React.ReactNode }) {
  const contextStore: FarmSupplyContextStore = {
    seeds: useSeeds(),
    farmhands: useFarmhands(),
    establishments: useEstablishments(),
  };

  return <FarmSupply.Provider value={ contextStore }>{ props.children }</FarmSupply.Provider>;
}

const useFarmSupplyContext = () => useContext(FarmSupply) as FarmSupplyContextStore;
export { FarmSupply, useFarmSupplyContext, FarmSupplyProvider };
