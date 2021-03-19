import React, { useState, useEffect } from 'react';

export interface TransferMenuProps<T> {
  DisplayComponent: React.ComponentType<T>,
  available: T[],
  commitTransfer: (inBound: T[], outBound: T[]) => void,
  transferCountInc: Function,
  transferCountDec: Function,
  transferCountReset: Function,
};

interface MemberById<T> {
  [id: number]: T,
};

enum Pane {
  Left,
  Right,
};

function TransferMenu<T>(props: TransferMenuProps<T>) {
  const [ inbound, setInbound ] = useState<MemberById<T>>({});
  const [ outbound, setOutbound ] = useState<MemberById<T>>({});

  useEffect(() => {
    setOutbound({});
    setInbound(processInbound());
    props.transferCountReset();
  }, [props.available]);

  function processInbound() {
    return { ...props.available };
  }

  function moveToPane(id: any, pane: Pane) {
    switch (pane) {
      case Pane.Left: {
        if (!(id in outbound)) {
          return;
        }

        let nextOutbound = { ...outbound };
        delete nextOutbound[id];

        setInbound({ ...inbound, [id]: outbound[id]});
        setOutbound(nextOutbound);
        props.transferCountDec();
        break;
      }
      case Pane.Right: {
        if (!(id in inbound)) {
          return;
        }

        let nextInbound = { ...inbound };
        delete nextInbound[id];

        setInbound(nextInbound);
        setOutbound({ ...outbound, [id]: inbound[id]});
        props.transferCountInc();
        break;
      }
      default:
        throw Error(`Unknown Pane enum value: ${pane}`);
    }
  }

  function commitTransfer() {
    props.commitTransfer(Object.values(inbound), Object.values(outbound));
  }

  const { DisplayComponent } = props;
  return (
    <div>
      <section className="transfer-available transfer-pane">
        <h3>Available</h3>
        {
          Object.entries(inbound).map(([id, member]) => (
            <div key={ id } className="transfer-display"
              onClick={ () => moveToPane(id, Pane.Right) }
              onKeyUp={ (e) => {
                if (e.keyCode === 13) { moveToPane(id, Pane.Right) }
              }}>
              <DisplayComponent { ...member } />
            </div>
          ))
        }
      </section>
      <section className="transfer-outbound transfer-pane">
        <h3>Outbound</h3>
        {
          Object.entries(outbound).map(([id, member]) => (
            <div key={ id } className="transfer-display"
              onClick={ () => moveToPane(id, Pane.Left) }
              onKeyUp={ (e) => {
                if (e.keyCode === 13) { moveToPane(id, Pane.Left) }
              }}>
              <DisplayComponent { ...member } />
            </div>
          ))
        }
      </section>
      <button onClick={ () => commitTransfer() }>commit transfer</button>
    </div>
  );
}

export default TransferMenu;
