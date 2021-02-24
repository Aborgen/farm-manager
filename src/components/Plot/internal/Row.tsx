//@ts-nocheck
import React, {useRef} from 'react';
import { makeFocusable } from 'components/FocusableWrapper';
import { PlayerActions } from 'context/PlayerActions';

import { usePlayerActionsContext } from 'context/PlayerActions';
import { Crop, GrowthStage } from 'types/Crops';

interface RowProps {
  crop: Crop,
  stage: GrowthStage,
}

function Row(props: RowProps) {
  class FocusableRow extends React.Component {
    render() {
      const { props } = this;
      return (
        <div className={ `${props.crop}-${props.stage}-row` }
          onClick={ () => props.handleClick() }>
          <span className={ `${props.crop}${ props.isFocused ? " focused" : "" }`  }>
            { props.crop }, stage {props.stage}
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
