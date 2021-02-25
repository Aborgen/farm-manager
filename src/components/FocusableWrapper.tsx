import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { usePlayerActionsContext } from 'context/PlayerActions';

type FocusableProps = {
  handleClick: Function,
  isFocused: boolean,
};

function FocusableWrapper(Component: React.ComponentType) {
  return function Focusable(props: any) {
    const ref = useRef();
    const context = usePlayerActionsContext();
    const [focusId, _] = useState(uuidv4());
    function handleClick() {
      context.setFocus(ref);
    }

    function isFocused() {
      if (context.state === undefined || context.state.focus === null || context.state.focus.current == null) {
        return false;
      }

      if (!context.state.focus.current) {
        return false;
      }

      const currentFocusId = context.state.focus.current.props.focusId;
      return focusId === currentFocusId;
    }

    return (
      <Component { ...props }
        ref={ ref }
        focusId={ focusId }
        isFocused={ isFocused() }
        handleClick={ handleClick }/>
    );
  }
}

export type { FocusableProps };

// NOTE: If a component is made focusable, none of its children can also be focusable. The child's ref.current is always set to null. (Bug?)
export function makeFocusable(Component: React.ComponentType<any>) {
  const forwardComponent = React.forwardRef<React.ReactElement, any>((innerProps, ref) => <Component { ...innerProps } ref={ ref }/>);
  return FocusableWrapper(forwardComponent);
};

export default FocusableWrapper;
