import React from 'react';

import { makeFocusable, FocusableProps } from 'components/FocusableWrapper';
import { FarmSupply } from 'context/FarmSupply';
import { GrowthStage, Crop } from 'types/Crops';
import { Row, DefaultRow, RowProps, RowType } from './internal/Row';
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
      rows: this.defaultRows(),
      plowedRows: 0,
    };
  }

  defaultRows() {
    let arr = [];
    for (let i = 0; i < this.rowMax(); ++i) {
      arr.push(<DefaultRow key={ i } />);
    }

    return arr;
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

  sellRow(idx: number) {
    this.setState((prevState: any) => {
      const length = this.state.rows.length - 1;
      if (idx < 0 || idx > length) {
        throw(`Tried to sell row at index ${idx}, but only have index up to ${length}`);
      }

      let rows: RowType[] = [];
      prevState.rows.forEach((row: RowType, i: number) => {
        if (i === idx) {
          rows.push(<DefaultRow key={ i } />);
        }
        else {
          rows.push(row);
        }
      });

      return {
        rows,
        plowedRows: prevState.plowedRows - 1,
      };
    });
  }

  plowRow(crop: Crop) {
    if (this.state.plowedRows === this.state.rows.length) {
      return;
    }

    if (!this.context.seeds.hasSeeds(crop)) {
      console.log(`Out of ${crop} seeds!`);
      return;
    }

    this.context.seeds.decSeeds(crop);
    this.setState((prevState: any) => {
      let foundEmpty = false;
      let rows: RowType[] = [];
      prevState.rows.forEach((row: RowType, i: number) => {
        if (!foundEmpty && row.type === DefaultRow) {
          const props: RowProps = {
            id: i,
            crop,
            sell: this.sellRow.bind(this),
            stage: GrowthStage.Planted,
          };

          foundEmpty = true;
          rows.push(<Row key = { i } { ...props } />);
        }
        else {
          rows.push(row);
        }
      });

      return {
        rows,
        plowedRows: prevState.plowedRows + 1,
      };
    });
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
        <span className="counter">{ `${this.state.plowedRows}/${this.state.rows.length}` }</span>
        {
          this.state.rows
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
