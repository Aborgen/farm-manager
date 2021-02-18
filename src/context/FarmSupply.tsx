import { createContext, useState, useContext } from 'react';

import { Crop, SeedStorage } from 'types/Crops';

const FarmSupply = createContext({});
const initSeeds: SeedStorage = {
  [Crop.Carrot]: { count: 5, max: 20 },
  [Crop.Corn]:   { count: 5, max: 20 },
  [Crop.Celery]: { count: 5, max: 20 },
};

function useSeeds(defaultSeeds: SeedStorage) {
  const [ seeds, setSeeds ] = useState(defaultSeeds);

  function decSeeds(crop: Crop) {
    if (seeds[crop].count === 0) {
      throw Error("Tried to decrement seeds below 0");
    }

    let nextSeeds = { ...seeds };
    nextSeeds[crop] = {
        ...nextSeeds[crop],
        count: nextSeeds[crop].count - 1
    };

    setSeeds(nextSeeds);
  }

  return { seeds, setSeeds, decSeeds };
}

function FarmSupplyProvider(props: any) {
  const { seeds, decSeeds } = useSeeds(initSeeds);
  const contextStore = {
    seeds,
    decSeeds,
  };

  return (<FarmSupply.Provider value={ contextStore }>{ props.children }</FarmSupply.Provider>);
}

const useFarmSupplyContext = () => useContext(FarmSupply);
export { useFarmSupplyContext, FarmSupplyProvider };
