import React, {useRef} from 'react';
import { makeFocusable, FocusableProps } from 'components/FocusableWrapper';
import { PlayerActions } from 'context/PlayerActions';

import { usePlayerActionsContext } from 'context/PlayerActions';
import { Crop, GrowthStage } from 'types/Crops';

type RowProps = {
  crop: Crop,
  stage: GrowthStage,
}

function Row(props: RowProps) {
  class FocusableRow extends React.Component<RowProps & FocusableProps> {
      render() {
        return (
          <div className={ `${this.props.crop}-${this.props.stage}-row` }
            onClick={ () => this.props.handleClick() }>
            <span className={ `${this.props.crop}${ this.props.isFocused ? " focused" : "" }`  }>
              { this.props.crop }, stage {this.props.stage}
            </span>
          </div>
        );
      }
  }

  return makeFocusable(FocusableRow, props);
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
