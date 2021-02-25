import { useState } from 'react';

import { Crop } from 'types/Crops';
import { useFarmSupplyContext } from 'context/FarmSupply';
import Plot, { PlotProps, PlotGrade } from './Plot/Plot';


const defaultProps: PlotProps[] = [
  {
    grade: PlotGrade.Poor,
  },
  {
    grade: PlotGrade.Excellent,
  }
];

export default function Field() {
  const [ plots, setPlots ] = useState(defaultProps);
  const context = useFarmSupplyContext();
  return (
    <div className="field">
      {
        plots.map((plot, key) => (
          <Plot key={ key } { ...plot } />
        ))
      }
    </div>
  );
}
