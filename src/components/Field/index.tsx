import { useState } from 'react';

import Plot, { PlotProps, PlotGrade } from 'components/Plot';
import styles from './Field.module.css';


const defaultProps: PlotProps[] = [
  {
    grade: PlotGrade.Poor,
    index: 1,
    name: "Plot1",
  },
  {
    grade: PlotGrade.Excellent,
    index: 2,
    name: "Plot2",
  }
];

export default function Field() {
  const plots = useState(defaultProps)[0];
  return (
    <div className={ styles.field }>
      {
        plots.map((plot, key) => (
          <Plot key={ key } { ...plot } />
        ))
      }
    </div>
  );
}
