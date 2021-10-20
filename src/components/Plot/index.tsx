import React from 'react';

import { makeEstablishment, EstablishmentProps } from 'wrappers/EstablishmentWrapper';
import { FarmSupply } from 'context/FarmSupply';
import { GrowthStage, Crop } from 'types/Crops';
import { Row, DefaultRow, RowProps, RowType } from './internal/Row';
import PlowDialogue from './internal/PlowDialogue';
import PlotName from './internal/PlotName';
import Farmhand, { Size } from 'components/Farmhand';

import { PlotProps, PlotGrade } from 'types/Plots';

import styles from './Plot.module.css';

class PlotClass extends React.Component<PlotProps & EstablishmentProps, any> {
  constructor(props: PlotProps & EstablishmentProps) {
    super(props);
    this.state = {
      rows: this.defaultRows(),
      plowedRows: 0,
      nameSelected: false,
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
// TODO: Unset focus when row is sold
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
    let l: RowType[] = [];
    for (let i = 0; i < this.rowMax(); ++i) {
      let row;
      if (i < this.state.rows.length) {
        row = this.state.rows[i];
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
      <section className={ `${styles.plot}${this.props.isFocused ? " focused" : ""}` }
        onClick={ (e) => this.props.handleClick(e) }>
        <div>
          <PlotName name={ this.props.name } setName={ this.props.setName } />
          <PlowDialogue plowRow={ this.plowRow.bind(this) } />
          <span className={ styles["plot-row-counter"] }>{ `${this.state.plowedRows}/${this.state.rows.length} planted` }</span>
          <div className={ styles.rows }>
          {
            this.state.rows
          }
          </div>
        </div>
        <div className={ styles["establishment-display"] }>
          <h5 className={ styles["workers-name"] }>Workers</h5>
          <section className={ styles.workers }>
          {
            Object.values(this.props.farmhands).map((farmhand, key) => (
              <Farmhand key={ key }
                specialty={ farmhand.specialty }
                size={ Size.Small } />
            ))
          }
          </section>
        </div>
      </section>
    );
  }
}

PlotClass.contextType = FarmSupply;
const EstablishmentPlot = makeEstablishment(PlotClass);

function Plot(props: PlotProps) {
  return <EstablishmentPlot { ...props } />;
}

export type { PlotProps };
export { PlotGrade };
export default Plot;
