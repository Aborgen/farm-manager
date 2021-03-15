import React, { useState, useEffect } from 'react';

import { FarmhandByIdentifier, Farmhand } from 'types/Farmhands';
import { useFarmSupplyContext } from 'context/FarmSupply';
import { Establishment as EstablishmentT } from 'context/FarmSupply/Establishments';
import { makeFocusable, FocusableProps } from './FocusableWrapper';
import { applyWrapperWithForwardRef } from './general';

interface EstablishmentProps extends FocusableProps {
  farmhands: FarmhandByIdentifier,
  assignTo: Function,
  dismiss: Function,
  canAcceptNFarmhands: Function,
  atFarmhandCapacity: Function,
  farmhandSlotsAvailable: Function,
};

function EstablishmentWrapper(Component: React.ComponentType<any>) {
  function Establishment(props: EstablishmentProps, ref: React.Ref<React.ReactElement>) {
    const [ farmhands, setFarmhands ] = useState<FarmhandByIdentifier>({});
    const [ farmhandCount, setFarmhandCount ] = useState(0);
    const farmhandCapacity = useState(3)[0];
    const context = useFarmSupplyContext();

    useEffect(() => {
      context.establishments.push(ref);
    }, [ref]);

//    function assignTo(entities: any) {
//      switch (typeof entities) {
//        case Farmhand:
//          assignFarmhand(entities);
//          break;
//        default:
//          throw Error(`Unknown assignment ${typeof entities}:${entities} to establishment ${ref}`);
//      }
//
//        assignFarmhand(entities);
//    }

    function assignFarmhand(farmhands: Farmhand[]) {
      if (!canAcceptNFarmhands(farmhands.length)) {
        throw Error(`Cannot exceed farmhand capacity: tried to assign ${farmhands.length} while at ${farmhandCount}`)
      }

      let nextFarmhands: FarmhandByIdentifier = {};
      let i = 0;
      for (const farmhand of farmhands) {
        farmhand.assignment = ref as EstablishmentT;
        nextFarmhands[farmhand.id] = farmhand;
        ++i;
      }

      setFarmhands({ ...farmhands, ...nextFarmhands });
      setFarmhandCount(farmhandCount + i);
    }

    function dismiss(id: number) {
      let nextFarmhands = { ...farmhands };
      delete nextFarmhands[id];
      setFarmhands(nextFarmhands);
      setFarmhandCount(farmhandCount - 1);
    }

    function atFarmhandCapacity() {
      return farmhandCount === farmhandCapacity;
    }

    function farmhandSlotsAvailable() {
      return farmhandCapacity - farmhandCount;
    }

    function canAcceptNFarmhands(n: number) {
      return (farmhandCount + n) <= farmhandCapacity;
    }

    return (
      <Component { ...props }
        ref={ ref }
        farmhands={ farmhands }
        farmhandCapacity={ farmhandCapacity }
        farmhandCount={ farmhandCount }
        canAcceptNFarmhands={ canAcceptNFarmhands }
        atFarmhandCapacity={ atFarmhandCapacity }
        farmhandSlotsAvailable={ farmhandSlotsAvailable }
        assignTo={ assignFarmhand }
        dismiss={ dismiss } />
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
