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
    // Don't ever expect to change focusId
    const focusId = useState(uuidv4())[0];
    function handleClick(e: MouseEvent) {
      e.stopPropagation();
      context.setFocus(ref);
    }

    function isFocused() {
      // focus's type is expected to be a react ref or null. A ref's current property may also be null.
      if (context.state.focus === null || context.state.focus.current === null) {
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

export function makeFocusable(Component: React.ComponentType<any>) {
  const forwardComponent = React.forwardRef<React.ReactElement, any>((innerProps, ref) => <Component { ...innerProps } ref={ ref }/>);
  return FocusableWrapper(forwardComponent);
};

export default FocusableWrapper;
