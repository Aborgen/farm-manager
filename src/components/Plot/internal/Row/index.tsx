import React from 'react';

import { makeFocusable, FocusableProps } from 'wrappers/FocusableWrapper';
import SellDialogue from 'components/SellDialogue';

import { Crop, GrowthStage } from 'types/Crops';

import styles from './Row.module.css';

type RowProps = {
  id: number,
  crop: Crop,
  stage: GrowthStage,
  sell: Function,
};

type RowType = React.ReactElement<typeof Row> | React.ReactElement<typeof DefaultRow>;
class RowClass extends React.Component<RowProps & FocusableProps> {
  sell() {
    this.props.sell(this.props.id);
  }

  render() {
    return (
      <div className={ `${styles[this.props.crop]} ${styles.row} ${this.props.isFocused ? "focused" : ""}` }
        onClick={ (e) => this.props.handleClick(e) }>
        <span>
          { this.props.crop }, stage {this.props.stage}
        </span>
        { this.props.isFocused && <SellDialogue sell={ this.sell.bind(this) }/> }
      </div>
    );
  }
}

const FocusableRow = makeFocusable(RowClass);
function Row(props: RowProps) {
  return <FocusableRow { ...props } />;
}

function DefaultRow() {
  return (
    <div className={ `${styles.row} ${styles.empty} ` }>
      <span>empty!</span>
    </div>
  );
}

export type { RowProps, RowType };
export { Row, DefaultRow };
