//@ts-nocheck
import React, { useState } from 'react';

import { makeFocusable, FocusableProps } from 'components/FocusableWrapper';
import { FarmSupply, useFarmSupplyContext } from 'context/FarmSupply';
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
  class FocusablePlot extends React.Component<PlotProps & FocusableProps> {
    rows = defaultRows;

    rowMax() {
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

    plowRow(crop: Crop) {
      if (this.rowMax() === this.rows.length || this.rowMax() < this.rows.length) {
        return;
      }
      else if (this.context.seeds[crop].count === 0) {
        console.log(`Out of ${crop} seeds!`);
        return;
      }

      const nextRow: RowProps = {
        crop,
        stage: GrowthStage.Planted,
      };

      this.context.decSeeds(crop);
      this.setState(prevState => ({
        rows: [nextRow]
      }));
    }

    renderRows() {
      let l = [];
      for (let i = 0; i < this.rowMax(); ++i) {
        let row;
        if (i < this.rows.length) {
          row = <Row key={ i } { ...this.rows[i] } />;
        }
        else {
          row = <DefaultRow key={ i } />;
        }

        l.push(row);
      }

      return l;
    }

    render() {
      return (
        <section className={`plot${this.props.isFocused ? " focused" : ""}`}
          onClick={ () => this.props.handleClick() }>
          <button onClick={ () => plowRow(Crop.Carrot) }>Plant carrots</button>
          <span className="counter">{ `${this.rows.length}/${this.rowMax()}` }</span>
          {
            this.renderRows()
          }
        </section>
      );
    }
  }

  FocusablePlot.contextType = FarmSupply;
  return makeFocusable(FocusablePlot, props);
}

export type { PlotProps };
export { PlotGrade };
export default Plot;
