import React from 'react';
import { makeFocusable, FocusableProps } from 'components/FocusableWrapper';

import { Crop, GrowthStage } from 'types/Crops';

type RowProps = {
  crop: Crop,
  stage: GrowthStage,
}

class RowClass extends React.Component<RowProps & FocusableProps> {
  render() {
    return (
      <div className={ `${this.props.crop}-${this.props.stage}-row` }
        onClick={ (e) => this.props.handleClick(e) }>
        <span className={ `${this.props.crop}${ this.props.isFocused ? " focused" : ""}` }>
          { this.props.crop }, stage {this.props.stage}
        </span>
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

export type { RowProps };
export { Row, DefaultRow };
