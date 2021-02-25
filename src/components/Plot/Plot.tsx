import React, { useState } from 'react';

import { makeFocusable, FocusableProps } from 'components/FocusableWrapper';
import { FarmSupply, useFarmSupplyContext } from 'context/FarmSupply';
import { GrowthStage, Crop } from 'types/Crops';
import { Row, DefaultRow, RowProps } from './internal/Row';
import PlowDialogue from './internal/PlowDialogue';

enum PlotGrade {
  Poor,
  Good,
  Great,
  Excellent,
};

interface PlotProps {
  grade: PlotGrade,
};

class PlotClass extends React.Component<PlotProps & FocusableProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      rows: [],
    };
  }

  rowMax() {
    let count = 0;
    switch (this.props.grade) {
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
    if (this.rowMax() === this.state.rows.length || this.rowMax() < this.state.rows.length) {
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
    this.setState((prevState: any) => ({
      rows: [...prevState.rows, nextRow]
    }));
  }

  renderRows() {
    let l = [];
    for (let i = 0; i < this.rowMax(); ++i) {
      let row;
      if (i < this.state.rows.length) {
        row = <Row key={ i } { ...this.state.rows[i] } />;
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
        onClick={ (e) => this.props.handleClick(e) }>
        { this.props.isFocused && <PlowDialogue plowRow={ this.plowRow.bind(this) } /> }
        <span className="counter">{ `${this.state.rows.length}/${this.rowMax()}` }</span>
        {
          this.renderRows()
        }
      </section>
    );
  }
}

PlotClass.contextType = FarmSupply;
const FocusablePlot = makeFocusable(PlotClass);

function Plot(props: PlotProps) {
  return <FocusablePlot { ...props } />;
}

export type { PlotProps };
export { PlotGrade };
export default Plot;
