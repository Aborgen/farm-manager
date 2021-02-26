import { useState } from 'react';

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
  //@ts-ignore
  const [ plots, setPlots ] = useState(defaultProps);
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
