import React, { useState } from 'react';

import { FarmhandByIdentifier, Farmhand } from 'types/Farmhands';
import { makeFocusable, FocusableProps } from './FocusableWrapper';
import { applyWrapperWithForwardRef } from './general';

interface EstablishmentProps extends FocusableProps {
  farmhands: FarmhandByIdentifier,
  assignFarmhand: Function,
  atFarmhandCapacity: Function,
};

function EstablishmentWrapper(Component: React.ComponentType<any>) {
  function Establishment(props: EstablishmentProps, ref: React.Ref<React.ReactElement>) {
    const [ farmhands, setFarmhands ] = useState({});
    const [ farmhandCount, setFarmhandCount ] = useState(0);
    const farmhandCapacity = useState(3)[0];

    function assignFarmhand(farmhand: Farmhand) {
      if (atFarmhandCapacity()) {
        return;
      }

      farmhand.assignment = ref as React.RefObject<React.ReactElement>;
      setFarmhands({ ...farmhands, [farmhand.id]: farmhand });
      setFarmhandCount(farmhandCount + 1);
    }

    function atFarmhandCapacity() {
      return farmhandCount === farmhandCapacity;
    }

    return (
      <Component { ...props }
        ref={ ref }
        farmhands={ farmhands }
        atFarmhandCapacity={ atFarmhandCapacity }
        assignFarmhand={ assignFarmhand } />
    );
  }
  
  const Foo = React.forwardRef<React.ReactElement, any>(Establishment);
  return makeFocusable(Foo);
}

export type { EstablishmentProps };

export function makeEstablishment(Component: React.ComponentType<any>) {
  return applyWrapperWithForwardRef(EstablishmentWrapper, Component);
};

export default EstablishmentWrapper;
