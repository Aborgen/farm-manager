import React, { useState, useEffect } from 'react';

import styles from './TransferMenu.module.css';

export interface TransferMenuProps<T> {
  DisplayComponent: React.ComponentType<T>,
  available: T[],
  fireTransfer: boolean,
  setFireTransfer: Function,
  commitTransfer: (inbound: T[], outbound: T[]) => void,
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

  useEffect(() => {
    if (props.fireTransfer) {
      commitTransfer();
    }
  }, [props.fireTransfer]);

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
    <div className={ styles["transfer-menu"] }>
      <section className={ `${styles["available"]} ${styles["pane"]}` }>
        <h3 className={ `${styles["pane-heading"]} cream_text-with-border--large` }>Available</h3>
        <div className={ styles["display"] }>
        {
          Object.entries(inbound).map(([id, member]) => (
            <div key={ id } className={ styles["display-item"] }
              onClick={ () => moveToPane(id, Pane.Right) }
              onKeyUp={ (e) => {
                if (e.keyCode === 13) { moveToPane(id, Pane.Right) }
              }}
              tabIndex={ 0 }>
              <DisplayComponent { ...member } />
            </div>
          ))
        }
        </div>
      </section>
      <section className={ `${styles["outbound"]} ${styles["pane"]}` }>
        <h3 className={ `${styles["pane-heading"]} cream_text-with-border--large` }>Outgoing</h3>
        <div className={ styles["display"] }>
        {
          Object.entries(outbound).map(([id, member]) => (
            <div key={ id } className={ styles["display-item"] }
              onClick={ () => moveToPane(id, Pane.Left) }
              onKeyUp={ (e) => {
                if (e.keyCode === 13) { moveToPane(id, Pane.Left) }
              }}
              tabIndex={ 0 }>
              <DisplayComponent { ...member } />
            </div>
          ))
        }
        </div>
      </section>
    </div>
  );
}

export default TransferMenu;
