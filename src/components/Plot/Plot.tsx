import { useState } from 'react';

import { useFarmSupplyContext } from 'context/FarmSupply';
import { GrowthStage, Crop } from 'types/Crops';
import Row, { RowProps } from './internal/Row';

enum PlotGrade {
  Poor,
  Good,
  Great,
  Excellent,
};

interface PlotProps {
  id: number,
  grade: PlotGrade,
};

const defaultRows = [
  {
    crop: Crop.Carrot,
    stage: GrowthStage.Growing,
  },
  {
    crop: Crop.Carrot,
    stage: GrowthStage.Growing,
  },
  {
    crop: Crop.Carrot,
    stage: GrowthStage.Finished,
  },
];

function Plot(props: PlotProps) {
  const [ rows, setRows ] = useState(defaultRows);
  const context = useFarmSupplyContext();

  function rowCount() {
    let count = 0;
    switch (props.grade) {
      case PlotGrade.Poor:
        count = 3;
        break;
      case PlotGrade.Good:
        count = 5;
        break;
      case PlotGrade.Great:
        count = 7;
        break;
      case PlotGrade.Excellent:
        count = 10;
        break;
    }

    return count;
  }

  function plowRow(crop: Crop) {
    if (rowCount() === rows.length || rowCount() < rows.length) {
      return;
    }
    else if (context.seeds[crop].count === 0) {
      console.log(`Out of ${crop} seeds!`);
    }

    const nextRow: RowProps = {
      crop,
      stage: GrowthStage.Planted,
    };

    context.decSeeds(crop);
    setRows([...rows, nextRow]);
  }

  return (
    <section className="plot">
      <button onClick={ () => plowRow(Crop.Carrot) }>Plant carrots</button>
      <span className="counter">{ `${rows.length}/${rowCount()}` }</span>
      {
        rows.map((row, key) => (
          <Row key={ key } { ...row } />
        ))
      }
    </section>
  );
}

export type { PlotProps };
export { PlotGrade };
export default Plot;
