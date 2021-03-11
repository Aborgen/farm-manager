import { useState } from 'react';

import Plot, { PlotProps, PlotGrade } from 'components/Plot';


const defaultProps: PlotProps[] = [
  {
    grade: PlotGrade.Poor,
    index: 1,
  },
  {
    grade: PlotGrade.Excellent,
    index: 2,
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
