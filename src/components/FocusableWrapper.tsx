//@ts-nocheck
import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { usePlayerActionsContext } from 'context/PlayerActions';

function FocusableWrapper(Component: React.ComponentType, props: any) {
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

    return context.state.focus && focusId === context.state.focus.current.props.focusId;
  }

  return (
    <Component { ...props }
      ref={ ref }
      focusId={ focusId }
      isFocused={ isFocused() }
      handleClick={ () => handleClick() }/>
  );
}

export function makeFocusable(Component, props) {
  const forwardComponent = React.forwardRef((innerProps, ref) => <Component { ...innerProps } ref={ ref }/>);
  return FocusableWrapper(forwardComponent, props);
}

export default FocusableWrapper;
