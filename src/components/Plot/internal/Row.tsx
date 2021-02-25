import React from 'react';

import { makeFocusable, FocusableProps } from 'components/FocusableWrapper';
import SellDialogue from 'components/SellDialogue';

import { Crop, GrowthStage } from 'types/Crops';

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
      <div className={ `${this.props.crop}-${this.props.stage}-row` }
        onClick={ (e) => this.props.handleClick(e) }>
        <span className={ `${this.props.crop}${ this.props.isFocused ? " focused" : ""}` }>
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
    <div className="empty-row">
      <span>empty!</span>
    </div>
  );
}

export type { RowProps, RowType };
export { Row, DefaultRow };
