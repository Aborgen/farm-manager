//@ts-nocheck

import { useState } from 'react';

import { Crop } from 'types/Crops';
import { useFarmSupplyContext } from 'context/FarmSupply';
import Plot, { PlotProps, PlotGrade } from './Plot/Plot';


const defaultProps: PlotProps[] = [
  {
    id: 1,
    grade: PlotGrade.Poor,
  },
  {
    id: 2,
    grade: PlotGrade.Excellent,
  }
];

export default function Field() {
  const [ plots, setPlots ] = useState(defaultProps);
  const context = useFarmSupplyContext();
  const carrots = context.seeds[Crop.Carrot];
  return (
    <div className="field">
      <ol className="seed-supply">
        {
          Object.entries(context.seeds).map(([crop, info], key) => (
          <li key={ key }>
            { `${crop} seeds: ${info.count}/${info.max}` }
          </li>
          ))
        }
      </ol>
      {
        plots.map((plot, key) => (
          <Plot key={ key } { ...plot } />
        ))
      }
    </div>
  );
}
