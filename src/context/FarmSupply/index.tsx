import { createContext, useContext } from 'react';

import { useEstablishments, EstablishmentsContextStore } from './Establishments';
import { useFarmhands, FarmhandsContextStore } from './Farmhands';
import { usePlots, PlotsContextStore } from './Plots';
import { useSeeds, SeedsContextStore } from './Seeds';

const FarmSupply = createContext({});

type FarmSupplyContextStore = {
  establishments: EstablishmentsContextStore,
  farmhands: FarmhandsContextStore,
  plots: PlotsContextStore,
  seeds: SeedsContextStore,
};

function FarmSupplyProvider(props: { children: React.ReactNode }) {
  const contextStore: FarmSupplyContextStore = {
    establishments: useEstablishments(),
    farmhands: useFarmhands(),
    plots: usePlots(),
    seeds: useSeeds(),
  };

  return <FarmSupply.Provider value={ contextStore }>{ props.children }</FarmSupply.Provider>;
}

const useFarmSupplyContext = () => useContext(FarmSupply) as FarmSupplyContextStore;
export { FarmSupply, useFarmSupplyContext, FarmSupplyProvider };
