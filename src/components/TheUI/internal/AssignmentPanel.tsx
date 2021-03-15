import { useState } from 'react';

import { useFarmSupplyContext } from 'context/FarmSupply';
import { Establishment } from 'context/FarmSupply/Establishments';
import { Farmhand as FarmhandT } from 'types/Farmhands';
import TransferMenu from 'components/TransferMenu';
import Farmhand from 'components/Farmhand';

function AssignmentPanel() {
  const [ currentEstablishment, setCurrentEstablishment ] = useState<Establishment | null>(null);
  const [ currentOption, setCurrentOption ] = useState<string | null>(null);
  const [ transferCount, setTransferCount ] = useState(0);
  const { establishments, farmhands } = useFarmSupplyContext();

  function commitTransfer(inbound: FarmhandT[], outbound: FarmhandT[]) {
    if (currentEstablishment === null || outbound.length === 0) {
      return false;
    }
    else if (currentEstablishment.current === null || !currentEstablishment.current.props.canAcceptNFarmhands(outbound.length)) {
      return false;
    }

    establishments.assignTo(currentEstablishment, outbound);
    farmhands.overwriteUnassigned(inbound);
    // An issue with using props from Establishments inside of the option elements: currently, I am displaying how many farmhands out
    // of a maximum are assigned to each Establishment. If the numbers start out as 0/3, there is a race condition where they will not update,
    // since AssignmentPanel does not care if the state changes in an Establishment. They will remain at 0/3 until AssignmentPanel is re-rendered.
    window.setTimeout(() => {
      setCurrentEstablishment(null);
      setCurrentOption(null);
      setTransferCount(0);
    }, 0);

    return true;
  }

  return (
    <div>
      <TransferMenu
        available={ farmhands.state.unassigned }
        DisplayComponent={ Farmhand }
        commitTransfer={ commitTransfer }
        transferCountInc={ () => setTransferCount(transferCount + 1) }
        transferCountDec={ () => setTransferCount(transferCount - 1) } />
      <select size={ Math.min(establishments.get().length + 1, 7) } value={ currentOption === null ? "-1" : currentOption } onChange={ (e) => setCurrentOption(e.target.value) }>
      <option value="-1"></option>
      {
        establishments.get().map((establishment: Establishment, i: number) => {
          if (establishment.current === null) {
            return null;
          }

          return (
            <option key={ i }
              value={ i }
              onClick={ () => setCurrentEstablishment(establishment) }
              disabled={ establishment.current.props.atFarmhandCapacity() || !establishment.current.props.canAcceptNFarmhands(transferCount) }>
              { establishment.current.props.name } { establishment.current.props.farmhandCount }/{ establishment.current.props.farmhandCapacity }
            </option>
          );
        })
      }
      </select>
    </div> 
  );
}

export default AssignmentPanel;
