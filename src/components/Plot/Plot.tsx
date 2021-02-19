import { useState } from 'react';

import { useFarmSupplyContext } from 'context/FarmSupply';
import { GrowthStage, Crop } from 'types/Crops';
import { Row, DefaultRow, RowProps } from './internal/Row';

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

  function rowMax() {
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
    if (rowMax() === rows.length || rowMax() < rows.length) {
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

  function renderRows() {
    let l = [];
    for (let i = 0; i < rowMax(); ++i) {
      let row;
      if (i < rows.length) {
        row = <Row key={ i } { ...rows[i] } />;
      }
      else {
        row = <DefaultRow key={ i } />;
      }

      l.push(row);
    }

    return l;
  }

  return (
    <section className="plot">
      <button onClick={ () => plowRow(Crop.Carrot) }>Plant carrots</button>
      <span className="counter">{ `${rows.length}/${rowMax()}` }</span>
      {
        renderRows()
      }
    </section>
  );
}

export type { PlotProps };
export { PlotGrade };
export default Plot;
