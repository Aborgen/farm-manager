//@ts-nocheck
import { useState } from 'react';

import { useFarmSupplyContext } from 'context/FarmSupply';
import TransferMenu from 'components/TransferMenu';
import Farmhand from 'components/Farmhand';
import { Establishment } from 'context/FarmSupply/Establishments';
import { Farmhand as FarmhandT } from 'types/Farmhands';

function AssignmentPanel() {
  const [ currentEstablishment, setCurrentEstablishment ] = useState(null);
  const { establishments, farmhands } = useFarmSupplyContext();

  function commitTransfer(inbound: FarmhandT[], outbound: FarmhandT[]) {
    if (currentEstablishment == null) {
      return;
    }

    farmhands.overwriteUnassigned(inbound);
    establishments.assignTo(currentEstablishment, outbound);
  }

  return (
    <div>
      <TransferMenu available={ farmhands.state.unassigned } DisplayComponent={ Farmhand } commitTransfer={ commitTransfer } />
      <select>
      {
        establishments.get().map((establishment: Establishment, key: number) => (
          <option key={ key }
            onClick={ () => setCurrentEstablishment(establishment) }>
            { establishment.current.state.name }
          </option>
        ))
      }
      </select>
    </div> 
  );
}

export default AssignmentPanel;
