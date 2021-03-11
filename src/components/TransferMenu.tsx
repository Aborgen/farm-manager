import React, { useState, useEffect } from 'react';

interface TransferMenuProps<T> {
  DisplayComponent: React.ComponentType<T>,
  available: T[],
  commitTransfer: (inBound: T[], outBound: T[]) => void,
};

interface MemberById<T> {
  [id: number]: T,
};

enum Pane {
  Left,
  Right,
};

//TODO: Make sure to prevent transfer if too many members
function TransferMenu<T>(props: TransferMenuProps<T>) {
  const [ inbound, setInbound ] = useState<MemberById<T>>({});
  const [ outbound, setOutbound ] = useState<MemberById<T>>({});

  useEffect(() => {
    setInbound({});
    setOutbound({});
    // This has to be done for some reason.
    setInbound(processInbound());
  }, [props.available]);

  function processInbound() {
    let obj: MemberById<T> = {};
    for (let i = 0; i < props.available.length; ++i) {
      obj[i] = props.available[0];
    }

    return obj;
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
              onClick={ () => moveToPane(id, Pane.Right) }>
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
              onClick={ () => moveToPane(id, Pane.Left) }>
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
