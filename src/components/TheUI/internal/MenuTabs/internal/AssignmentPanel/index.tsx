import { useState } from 'react';

import { Farmhand as FarmhandT } from 'types/Farmhands';
import Farmhand from 'components/Farmhand';
import TransferMenu from 'components/TransferMenu';
import { useFarmSupplyContext } from 'context/FarmSupply';
import { Establishment } from 'context/FarmSupply/Establishments';
import EstablishmentSelect from './internal/EstablishmentSelect';
import styles from './AssignmentPanel.module.css';

function AssignmentPanel() {
  const [ currentEstablishment, setCurrentEstablishment ] = useState<Establishment | null>(null);
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
      setTransferCount(0);
    }, 0);

    return true;
  }

  return (
    <div className={ styles["assignment-panel"] }>
      <div className={ styles["transfer-menu-container"] }>
        <TransferMenu
          available={ farmhands.state.unassigned }
          DisplayComponent={ Farmhand }
          commitTransfer={ commitTransfer }
          transferCountInc={ () => setTransferCount(transferCount + 1) }
          transferCountDec={ () => setTransferCount(transferCount - 1) }
          transferCountReset={ () => setTransferCount(0) } />
      </div>
      <section className={ styles["action"] }>
        <h2 className={ `${styles["action-heading"]} cream_text-with-border--large` }>Establishments</h2>
        <EstablishmentSelect
          currentEstablishment={ currentEstablishment }
          setCurrentEstablishment={ setCurrentEstablishment }
          transferCount={ transferCount } />
        <button className="cream_button">commit</button>
      </section>
    </div> 
  );
}

export default AssignmentPanel;
