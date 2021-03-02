import React from 'react';

interface WrapperType {
  (Component: React.ComponentType<any>): React.ComponentType<any>,
};

function applyWrapperWithForwardRef(Wrapper: WrapperType, Component: React.ComponentType<any>) {
  const forwardComponent = React.forwardRef<React.ReactElement, any>((innerProps, ref) => <Component { ...innerProps } ref={ ref }/>);
  return Wrapper(forwardComponent);
};

export { applyWrapperWithForwardRef };
