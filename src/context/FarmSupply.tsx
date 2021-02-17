import { createContext, useState, useContext } from 'react';

import { Crop } from 'types/Crops';

const FarmSupply = createContext({});

let initSeeds: any = {};
initSeeds[Crop.Carrot] = {
  count: 5,
  max: 100,
};

function decSeeds(crop: Crop, seeds: any, setSeeds: any) {
  if (seeds[crop].count === 0) {
    throw Error("Tried to decrement seeds below 0");
  }

  console.log(seeds);
  const nextSeeds = {
    ...seeds,
    'carrot': {
      ...seeds[crop],
      count: seeds[crop].count - 1
    }
  }

  setSeeds(nextSeeds);
}

function FarmSupplyProvider(props: any) {
  const [ seeds, setSeeds ] = useState(initSeeds);
  const contextStore = {
    seeds,
    decSeeds: (crop: Crop) => decSeeds(crop, seeds, setSeeds),
  }

  return <FarmSupply.Provider value={ contextStore }>{ props.children }</FarmSupply.Provider>
}


const useFarmSupplyContext = () => useContext(FarmSupply);
export { useFarmSupplyContext, FarmSupplyProvider };
